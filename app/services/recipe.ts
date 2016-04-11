import {Injectable} from 'angular2/core';
import {Util} from './util';
import {Config} from './config';
import {RecipeDB} from './recipedb';
import {LinkedList, ILinkedListNode} from './collections/LinkedList';

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
    parent: string;
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
    downloadAll (complete?: Function) {
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

    create (data?: IRecipe): Recipe {
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

    add (recipe: Recipe) {
        gRecipes[recipe.id] = recipe;
    }

    sync () {

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

export class Recipe implements IRecipe {
    private _db: RecipeDB;

    public id: string;
    public owner: string;
    public name: string;
    public updated: number;
    public sources: any[];

    constructor (recipeid?: string) {
        this.id = recipeid;
        this._db = new RecipeDB();
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
    public __syncIndexdDB () {
        if (!this._db) {
            this._db.init();
        }
        console.log("sync");
        // this._db.sync(gRecipes);
    
        this._db.open().then( () => {
            this._db.table("recipes").get(this.id)
            .then( (recipeData: IRecipe) => {
                console.log(recipeData);
                if (recipeData) {
                    console.log(recipeData);
                    if (this.updated > recipeData.updated) {
                        this._db.table("recipes").put(this)
                        .catch (function (error: any) {
                            console.log(error);
                        });
                    } else {
                        this.import(recipeData);
                    }
                } else {
                    this._db.table("recipes").add(this)
                    .catch (function (error: any) {
                        // console.log(error);
                    });
                }
                this.import(recipeData);
            }).catch( (error: any) => {
                console.log('error: ', error);
            });
        }).finally( () => {
            // this._db.close();
        });
    }
    
    public syncIndexdDB() {
        this._db.open().then( () => {
            this._db.syncArray("recipes", Util.JSON2Array(gRecipes), () => {
                console.log("complete syncArray()");
                this._db.close();
            });
        });
        
    }
}

export class RecipeItem {
    private _id: string;
    private _db: RecipeDB;
    private _data: IRecipeItem;

    constructor (itemid?: string) {
        this.id = itemid;
        this._db = new RecipeDB();
    }
        
    public import (data: IRecipeItem, overwrite: boolean = false) {
        if (overwrite) {
            this._data = data;
        } else {
            this._data = $.extend(this._data, data);
        }
        this.id = this._data.id;
    }
    
    public export () {
        return this._data;
    }

    // Sync recipes between memory and IndexedDB(localStorage)
    public __syncIndexdDB () {
        if (!this._db) {
            this._db.init();
        }
    
        this._db.open().then( () => {
            this._db.table("recipes").get(this.id)
            .then( (recipeData: IRecipeItem) => {
                console.log(recipeData);
                if (recipeData) {
                    console.log(recipeData);
                    if (this.updated > recipeData.updated) {
                        this._db.table("recipes").put(this._data)
                        .catch (function (error: any) {
                            console.log(error);
                        });
                    } else {
                        this.import(recipeData);
                    }
                } else {
                    this._db.table("recipes").add(this._data)
                    .catch (function (error: any) {
                        // console.log(error);
                    });
                }
                this.import(recipeData);
            }).catch( (error: any) => {
                console.log('error: ', error);
            });
        }).finally( () => {
            // this._db.close();
        });
    }
    
    public syncIndexdDB() {
        window.setTimeout( () => {
            this.__syncIndexdDB();
        }, 0);
    }
    
    get id(): string {
        return this._id;
    }
    
    set id(value: string) {
        this._id = value;
    }
    
    // return unix-timestamp
    get updated(): number {
        return this._data.updated;
    }
    
    set updated(unixTimestamp: number) {
        this._data.updated = unixTimestamp;
    }
    
    get data(): IRecipeItem {
        return this._data;
    }
    
    set data(value: IRecipeItem) {
        this._data = value;
    }
}
