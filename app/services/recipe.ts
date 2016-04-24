import {Injectable, ElementRef} from 'angular2/core';
import {Util} from './util';
import {Config} from './config';
import {LinkedList, ILinkedListNode} from './collections/LinkedList';
import {ViewObject} from '../directives/view-object/view-object';
import {DBObject} from './db';
import {RecipeDB} from './recipedb';


declare var $: any;
export var gRecipes: Object = {};

export interface IRecipe {
    id: string;
    owner: string;
    name: string;
    updated: number;
    removed: boolean;
    source?: any[];
}

export interface IRecipeItem {
    id: string;
    index: number;
    parent: string;
    type: string;
    updated: number;
    removed: boolean;
    source?: any[];
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
                id: this._userid + '-r' + Util.uniqID(Config.now()),
                owner: this._userid,
                name: 'untitled',
                removed: false,
                updated: 0
            };
        }
        let recipe = new Recipe();
        recipe.import(data);
        recipe.touch();
        return recipe;
    }

    public add (recipe: Recipe) {
        gRecipes[recipe.id] = recipe;
    }

    get userid(): string {
        return this._userid;
    }

    set userid(id: string) {
        this._userid = id;
    }
}

export class Recipe implements IRecipe, DBObject {
    private _db: RecipeDB;
    private _children: LinkedList<IRecipeItem> = new LinkedList<IRecipeItem>();

    public id: string;
    public owner: string;
    public name: string;
    public updated: number;
    public removed: boolean = false;
    public source: any[];

    constructor (recipeID?: string) {
        this.id = recipeID;
        this._db = new RecipeDB();
        this._db.init();
    }

    public import (data: IRecipe): IRecipe {
        return $.extend(this, data);
    }

    public export (): IRecipe {
        return {
            id: this.id,
            owner: this.owner,
            name: this.name,
            updated: this.updated,
            removed: this.removed,
            source: this.source
        };
    }

    public touch() {
        this.updated = Util.toUnixTimestamp(Config.now());
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
        this._db.open().then( () => {
            let store = this._db.table("recipe_items");
            if (this.children.size() <= 0) {
                store.where('parent').equals(this.id).each( (item: IRecipeItem) => {
                    this.children.add(item, item.index);
                }).then( () => {
                    complete.apply(null, [this.children]);
                });
            } else {
                complete.apply(null, [this.children]);
            }
        });
    }

    // 새로운 자식 아이템을 생성한다.
    public createChild(type?: string): IRecipeItem {
        let child: IRecipeItem = {
            id: this.id + '-i' + Util.uniqID(Config.now()),
            index: 0,
            type: type,
            parent: this.id,
            removed: false,
            updated: 0
        };
        return child;
    }

    public addChild(data: IRecipeItem, index?: number) {
        this.children.add(data, index);
    }

    public remove() {
        this.removed = true;
    }

    get children(): LinkedList<IRecipeItem> {
        return this._children;
    }

    set children(data: LinkedList<IRecipeItem>) {
        this._children = data;
    }
}

export class RecipeItem extends ViewObject implements IRecipeItem, DBObject {
    private _db: RecipeDB;

    public id: string;
    public index: number;
    public type: string;
    public parent: string;
    public updated: number;
    public removed: boolean = false;
    public sources: any[];

    constructor (elementRef: ElementRef) {
        super(elementRef);
        this._db = new RecipeDB();
        this._db.init();
    }

    public import (data: IRecipeItem): IRecipeItem {
        return $.extend(this, data);
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

    public touch() {
        this.updated = Util.toUnixTimestamp(Config.now());
    }

    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("recipe_items", this.export(), () => {
                console.log("Complete syncIndexdDB() at RecipeItem.");
                this._db.close();
            });
        });
    }

    public remove() {
        this.removed = true;
    }
}
