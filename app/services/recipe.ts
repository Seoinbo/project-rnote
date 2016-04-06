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
        let parameter = {};
        parameter[DBConfig.TB_RECIPES] = 'id';
        this._db.version(DBConfig.VERSION).stores(parameter);
    }

    load(recipeid: string) {
        this._db.open().then( () => {
            this._db[DBConfig.TB_RECIPES].get(recipeid).then( (item: any) => {
                console.log(item);
            });

        }).finally( () => {
            this._db.close();
        });
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
        this.load("g1625346125341653-r18662578655");
        // gRecipes[recipe.id] = recipe;
        // let store = this._db[DBConfig.TB_RECIPES];
        // let storedObject = store.get(recipe.id);
        // console.log(storedObject);
        // if (storedObject._value) {
        //     store.put(recipe);
        // } else {
        //     store.add(recipe);
        // }
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

// Recipe-DataBase-Table
export class RecipeDBT extends Dexie {
    recipes: Dexie.Table<RecipeData, number>;

    constructor() {
        super(DBConfig.DB_RNOTE);
        let parameter = {};
        parameter[DBConfig.TB_RECIPES] = 'id';
        this.version(DBConfig.VERSION).stores(parameter);
    }

    public getRecipe(recipeid: string) {
        this.open().then( () => {
            return this[DBConfig.TB_RECIPES].get(recipeid);
        }).finally( () => {
            this.close();
        });
    }
}

export interface RecipeData {
    id: string;
    owner: string;
    name: string;
    updated: number;
    items: any[];
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
