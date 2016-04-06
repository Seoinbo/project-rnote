System.register(['angular2/core', './config', 'dexie'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var gRecipes, RecipeService, RecipeDBT, Recipe;
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
                    var parameter = {};
                    parameter[config_1.DBConfig.TB_RECIPES] = 'id';
                    this._db.version(config_1.DBConfig.VERSION).stores(parameter);
                };
                RecipeService.prototype.load = function (recipeid) {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db[config_1.DBConfig.TB_RECIPES].get(recipeid).then(function (item) {
                            console.log(item);
                        });
                    }).finally(function () {
                        _this._db.close();
                    });
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
            // Recipe-DataBase-Table
            RecipeDBT = (function (_super) {
                __extends(RecipeDBT, _super);
                function RecipeDBT() {
                    _super.call(this, config_1.DBConfig.DB_RNOTE);
                    var parameter = {};
                    parameter[config_1.DBConfig.TB_RECIPES] = 'id';
                    this.version(config_1.DBConfig.VERSION).stores(parameter);
                }
                RecipeDBT.prototype.getRecipe = function (recipeid) {
                    var _this = this;
                    this.open().then(function () {
                        return _this[config_1.DBConfig.TB_RECIPES].get(recipeid);
                    }).finally(function () {
                        _this.close();
                    });
                };
                return RecipeDBT;
            }(dexie_1.default));
            exports_1("RecipeDBT", RecipeDBT);
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
