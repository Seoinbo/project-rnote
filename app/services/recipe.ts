import {Injectable} from 'angular2/core';
import {Util} from './util';
import {Config} from './config';
import {RecipeDB, IRecipeDBObject} from './recipedb';
import {LinkedList, ILinkedListNode} from './collections/LinkedList';

declare var $: any;
export var gRecipes: Object = {};

export interface IRecipe {
    id: string;
    owner: string;
    name: string;
    updated: number;
    sources?: any[];
}

export interface IRecipeItem {
    id: string;
    index: number;
    parent: string;
    type: string;
    updated: number;
    sources?: any[];
}

// You have to set userid first.
@Injectable()
export class RecipeService {
    private _userid: string;
    private _db: RecipeDB;

    constructor () {
        this._db = new RecipeDB();
        this._db.init();
    }

    // 모든 레시피 데이터 다운로드 from IndexedDB.
    public downloadAll (complete?: Function) {
        this._db.open().then( () => {
            this._db.table("recipes").each( (item: IRecipe) => {
                this.add(this.create(item));
            }).then( () => {
                complete.apply(null);
            });
        }).finally( () => {
            this._db.close();
        });
    }

    public create (data?: IRecipe): Recipe {
        if (!data) {
            data = {
                id: this.newID(),
                owner: this._userid,
                name: 'untitled',
                updated: Util.toUnixTimestamp(Config.now())
            };
        }
        let recipe = new Recipe();
        recipe.import(data);
        return recipe;
    }

    public add (recipe: Recipe) {
        gRecipes[recipe.id] = recipe;
    }

    // 새 레시피 아이디를 반환.
    private newID(): string {
        let base = new Date('2015-09-04 00:00:00').getTime();
        let current = Config.now();
        return this._userid + '-r' + (current - base);
    }

    get userid(): string {
        return this._userid;
    }

    set userid(id: string) {
        this._userid = id;
    }
}

export class Recipe implements IRecipe, IRecipeDBObject {
    private _db: RecipeDB;
    private _children: LinkedList<IRecipeItem> = new LinkedList<IRecipeItem>();

    public id: string;
    public owner: string;
    public name: string;
    public updated: number;
    public sources: any[];

    constructor (recipeid?: string) {
        this.id = recipeid;
        this._db = new RecipeDB();
        this._db.init();
    }

    public import (data: IRecipe) {
        $.extend(this, data);
    }

    public export (): IRecipe {
        return {
            id: this.id,
            owner: this.owner,
            name: this.name,
            updated: this.updated,
            sources: this.sources
        };
    }

    // Sync recipes between memory and IndexedDB(localStorage)
    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("recipes", this.export(), () => {
                console.log("Complete syncIndexdDB() at RecipeItem.");
                this._db.close();
            });
        });
    }

    public syncChildrenIDB(complete?: Function) {
        // this._db.open().then( () => {
        //     let store = this._db.table("recipe_items");
        //
        //     store.get()
        // });

        this._db.open().then( () => {
            let store = this._db.table("recipe_items");
            if (this.children.size() <= 0) {
                store.where('parent').equals(this.id).each( (item: IRecipeItem) => {
                    this.children.add(item, item.index);
                }).then( () => {
                    complete.apply(null, [this.children]);
                });
            } else {
                // let dupList: Object = {};
                // store.where('parent').equals(this.id).each( (item: IRecipeItem) => {
                //     if (this.children.indexOf(item) == -1) {
                //         dupList[item.id] = item;
                //     } else {
                //
                //     }
                // });
                complete.apply(null, [this.children]);
            }
        });
    }

    get children(): LinkedList<IRecipeItem> {
        return this._children;
    }

    set children(data: LinkedList<IRecipeItem>) {
        this._children = data;
    }
}

export class RecipeItem implements IRecipeItem, IRecipeDBObject {
    private _db: RecipeDB;

    public id: string;
    public index: number;
    public type: string;
    public parent: string;
    public updated: number;
    public sources: any[];

    constructor (itemid?: string) {
        this.id = itemid;
        this._db = new RecipeDB();
        this._db.init();
    }

    public import (data: IRecipeItem) {
        $.extend(this, data);
    }

    public export () {
        return {
            id: this.id,
            parent: this.parent,
            type: this.type,
            updated: this.updated,
            sources: this.sources
        };
    }

    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("recipe_items", this.export(), () => {
                console.log("Complete syncIndexdDB() at RecipeItem.");
                this._db.close();
            });
        });
    }
}
