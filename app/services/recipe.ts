import {Injectable} from 'angular2/core';
import {Config, DBConfig} from './config';
import Dexie from 'dexie';

export var gRecipes: Object = {};

@Injectable()
export class RecipeService {
    private _userid: string;
    private _db: Dexie;
    
    constructor () {
        this.initDB();
    }
    
    public initDB () {
        this._db = new Dexie(DBConfig.DB_RNOTE);
        let param = {};
        param[DBConfig.STORE_RECIPES] = 'owner, id';
        this._db.version(DBConfig.VERSION).stores(param);
        this._db.open();
    }
    
    loadAll () {
        
    }
    
    create (data?: any): Recipe {
        let recipe = new Recipe(this.newID());
        recipe.import({
            owner: this._userid,
            name: 'unknown'
        });
        this.add(recipe);
        
        return recipe;
    }
    
    add (recipe: Recipe) {
        gRecipes[recipe.id] = recipe;
        let store = this._db[DBConfig.STORE_RECIPES];
        let storedObject = store.get(recipe.id);
        if (storedObject._value) {
            store.put(recipe);
        } else {
            store.add(recipe);
        }
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
    
    // public getRecipe (recipeid: number): Recipe {
    //     
    //     return 
    // }
}

export class Recipe {
    id: string;
    owner: string;
    name: string;
    updated: number;
    items: any[];
    
    constructor (recipeid: string) {
        this.id = recipeid;
    }
    
    // public export () {
    //     return {
    //         
    //     }
    // }
    
    public import (data: any) {
        this.owner = data.owner;
        this.name = data.name;
        this.items = data.items;
    }
    
    public load () {
        var dbdata = {
            name: 'my note name',
            items: [
                {
                    type: 'view-header',
                    text: 'hello my title'
                }
            ]
        };
        
        this.import(dbdata);
    }
}
