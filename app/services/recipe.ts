// import {Injectable} from 'angular2/core';

export class RecipeService {
    private recipes: any;
    
    loadAll () {
        
    }
    
    create (userid: string, data?: any): Recipe {
        let recipeid = new Date().getTime();
        let recipe = new Recipe(recipeid);
        recipe.import({
            owner: userid,
            name: 'unknown'
        });
        this.add(recipe);
        
        return recipe;
    }
    
    add (recipe: Recipe) {
        this.recipes[recipe.id] = recipe;
    }
    
    sync () {
        
    }
    
    // public getRecipe (recipeid: number): Recipe {
    //     
    //     return 
    // }
}

export class Recipe {
    id: number;
    owner: string;
    name: string;
    updated: number;
    items: any[];
    
    constructor (recipeid: number) {
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
