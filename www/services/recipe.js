System.register(['angular2/core', './config', 'dexie'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_1, dexie_1;
    var gRecipes, RecipeService, Recipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (dexie_1_1) {
                dexie_1 = dexie_1_1;
            }],
        execute: function() {
            exports_1("gRecipes", gRecipes = {});
            RecipeService = (function () {
                function RecipeService() {
                    this.initDB();
                }
                RecipeService.prototype.initDB = function () {
                    this._db = new dexie_1.default(config_1.DBConfig.DB_RNOTE);
                    var param = {};
                    param[config_1.DBConfig.STORE_RECIPES] = 'owner, id';
                    this._db.version(config_1.DBConfig.VERSION).stores(param);
                    this._db.open();
                };
                RecipeService.prototype.loadAll = function () {
                };
                RecipeService.prototype.create = function (data) {
                    var recipe = new Recipe(this.newID());
                    recipe.import({
                        owner: this._userid,
                        name: 'unknown'
                    });
                    this.add(recipe);
                    return recipe;
                };
                RecipeService.prototype.add = function (recipe) {
                    gRecipes[recipe.id] = recipe;
                    var store = this._db[config_1.DBConfig.STORE_RECIPES];
                    var storedObject = store.get(recipe.id);
                    if (storedObject._value) {
                        store.put(recipe);
                    }
                    else {
                        store.add(recipe);
                    }
                };
                RecipeService.prototype.sync = function () {
                };
                // 새 레시피 아이디를 반환.
                RecipeService.prototype.newID = function () {
                    var base = new Date('2015-09-04 00:00:00').getTime();
                    var current = config_1.Config.now();
                    return this._userid + '-r' + (current - base);
                };
                Object.defineProperty(RecipeService.prototype, "userid", {
                    get: function () {
                        return this._userid;
                    },
                    set: function (id) {
                        this._userid = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                RecipeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RecipeService);
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
