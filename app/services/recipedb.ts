import {Util} from './util';
import {Config} from './config';
import Dexie from 'dexie';

export class RecipeDB extends Dexie {
    public static VERSION: number = 1;
    public static DB_RNOTE: string = 'rnote';

    constructor() {
        super(RecipeDB.DB_RNOTE);
    }
    
    public init() {
        if (this.isOpen()) {
            this.close();
        }
        this.version(RecipeDB.VERSION).stores({
            recipes: "id",
            recipe_items: "id"
        });
    }
    
    public table(name: string): any {
        return this[name];
    }
    
    public sync () {
        
    }
}
