// import {Injectable} from 'angular2/core';
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RecipeService, Recipe;
    return {
        setters:[],
        execute: function() {
            RecipeService = (function () {
                function RecipeService() {
                }
                RecipeService.prototype.loadAll = function () {
                };
                RecipeService.prototype.create = function (userid, data) {
                    var recipeid = new Date().getTime();
                    var recipe = new Recipe(recipeid);
                    recipe.import({
                        owner: userid,
                        name: 'unknown'
                    });
                    this.add(recipe);
                    return recipe;
                };
                RecipeService.prototype.add = function (recipe) {
                    this.recipes[recipe.id] = recipe;
                };
                RecipeService.prototype.sync = function () {
                };
                return RecipeService;
            }());
            exports_1("RecipeService", RecipeService);
            Recipe = (function () {
                function Recipe(recipeid) {
                    this.id = recipeid;
                }
                // public export () {
                //     return {
                //         
                //     }
                // }
                Recipe.prototype.import = function (data) {
                    this.owner = data.owner;
                    this.name = data.name;
                    this.items = data.items;
                };
                Recipe.prototype.load = function () {
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
                };
                return Recipe;
            }());
            exports_1("Recipe", Recipe);
        }
    }
});
