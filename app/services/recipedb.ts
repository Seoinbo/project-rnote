import {DB} from './db';
import {IRecipe, IRecipeItem} from './recipe';

// for IndexedDB
export class RecipeDB extends DB {
    constructor() {
        super();
    }
    
    public init() {
        if (this.isOpen()) {
            this.close();
        }
        this.version(RecipeDB.VERSION).stores({
            recipes: "id",
            recipe_items: "id, parent"
        });
        
        
    }
}
