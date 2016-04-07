import {Injectable} from 'angular2/core';
import {Util} from './util';
import {Config} from './config';
import {RecipeDB} from './recipedb';

export var gRecipes: Object = {};

export interface RecipeData {
    id: string;
    owner: string;
    name: string;
    updated: number;
    items?: any[];
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
    
    downloadAll (complete?: Function) {
        this._db.open().then( () => {
            this._db.table("recipes").each( (item: RecipeData) => {
                this.add(this.create(item));
            }).then( () => {
                complete.apply(null);
            });
        }).finally( () => {
            this._db.close();
        });
    }

    create (data?: RecipeData): Recipe {
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

export class Recipe {
    private _id: string;
    private _db: RecipeDB;
    private _data: RecipeData;

    constructor (recipeid?: string) {
        this.id = recipeid;
    }
        
    public import (data: RecipeData, overwrite: boolean = false) {
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
            .then( (recipeData: RecipeData) => {
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
    
    get data(): RecipeData {
        return this._data;
    }
    
    set data(value: RecipeData) {
        this._data = value;
    }
}
