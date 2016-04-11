import {Util} from './util';
import {Config} from './config';
import Dexie from 'dexie';
import {IRecipe, IRecipeItem} from './recipe';

// for IndexedDB
export class RecipeDB extends Dexie {
    public static VERSION: number = 1;
    public static DB_RNOTE: string = 'rnote';
    
    public recipes: Dexie.Table<IRecipe, string>
    public recipe_items: Dexie.Table<IRecipe, string>

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
    
    // src - local data
    public __sync(tableName: string, src: any, complete?: Function) {
        let store = this.table(tableName);
        store.get(src.id).then( (item) => {
            if (item) {
                if (src.updated > item.updated) {
                    store.put(src, src.id).then( () => {
                        complete.apply(null, [src]);
                    });
                } else {
                    src = item;
                    complete.apply(null, [src]);
                }
            } else {
                store.add(src, src.id).then( () => {
                    complete.apply(null, [src]);
                });
            }
        });
    }
        
    public sync(tableName: string, src: Array<any>, complete?: Function) {
        window.setTimeout( () => {
            this.__sync(tableName, src, complete);
        }, 0);
    }
    
    public __syncArray(tableName: string, src: Array<any>, complete?: Function) {
        
    }
    
    public syncArray(tableName: string, src: Array<any>, complete?: Function) {
        window.setTimeout( () => {
            this.__syncArray(tableName, src, complete);
        }, 0);
    }
}
// 
// export class RecipeDBT<T, key> implements Dexie.T {
//     
// }
