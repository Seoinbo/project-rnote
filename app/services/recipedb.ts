import {DB} from './db';
import {IRecipe, IRecipeItem} from './recipe';

// for IndexedDB
export class RecipeDB extends DB {
    constructor() {
        super();
    }
}
