System.register(['angular2/core', './util', './config', './recipedb', './collections/LinkedList'], function(exports_1, context_1) {
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
    var core_1, util_1, config_1, recipedb_1, LinkedList_1;
    var gRecipes, RecipeService, Recipe, RecipeItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (recipedb_1_1) {
                recipedb_1 = recipedb_1_1;
            },
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            }],
        execute: function() {
            exports_1("gRecipes", gRecipes = {});
            // You have to set userid first.
            RecipeService = (function () {
                function RecipeService() {
                    this._db = new recipedb_1.RecipeDB();
                    this._db.init();
                }
                // 모든 레시피 데이터 다운로드 from IndexedDB.
                RecipeService.prototype.downloadAll = function (complete) {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.table("recipes").each(function (item) {
                            _this.add(_this.create(item));
                        }).then(function () {
                            complete.apply(null);
                        });
                    }).finally(function () {
                        _this._db.close();
                    });
                };
                RecipeService.prototype.create = function (data) {
                    if (!data) {
                        data = {
                            id: this.newID(),
                            owner: this._userid,
                            name: 'untitled',
                            updated: util_1.Util.toUnixTimestamp(config_1.Config.now())
                        };
                    }
                    var recipe = new Recipe();
                    recipe.import(data);
                    return recipe;
                };
                RecipeService.prototype.add = function (recipe) {
                    gRecipes[recipe.id] = recipe;
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
                    this._children = new LinkedList_1.LinkedList();
                    this.id = recipeid;
                    this._db = new recipedb_1.RecipeDB();
                    this._db.init();
                }
                Recipe.prototype.import = function (data) {
                    $.extend(this, data);
                };
                Recipe.prototype.export = function () {
                    return {
                        id: this.id,
                        owner: this.owner,
                        name: this.name,
                        updated: this.updated,
                        sources: this.sources
                    };
                };
                // Sync recipes between memory and IndexedDB(localStorage)
                Recipe.prototype.syncIDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncIDB("recipes", _this.export(), function () {
                            console.log("Complete syncIndexdDB() at RecipeItem.");
                            _this._db.close();
                        });
                    });
                };
                Recipe.prototype.syncChildrenIDB = function (complete) {
                    // this._db.open().then( () => {
                    //     let store = this._db.table("recipe_items");
                    //
                    //     store.get()
                    // });
                    var _this = this;
                    this._db.open().then(function () {
                        var store = _this._db.table("recipe_items");
                        if (_this.children.size() <= 0) {
                            store.where('parent').equals(_this.id).each(function (item) {
                                _this.children.add(item, item.index);
                            }).then(function () {
                                complete.apply(null, [_this.children]);
                            });
                        }
                        else {
                            // let dupList: Object = {};
                            // store.where('parent').equals(this.id).each( (item: IRecipeItem) => {
                            //     if (this.children.indexOf(item) == -1) {
                            //         dupList[item.id] = item;
                            //     } else {
                            //
                            //     }
                            // });
                            complete.apply(null, [_this.children]);
                        }
                    });
                };
                Object.defineProperty(Recipe.prototype, "children", {
                    get: function () {
                        return this._children;
                    },
                    set: function (data) {
                        this._children = data;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Recipe;
            }());
            exports_1("Recipe", Recipe);
            RecipeItem = (function () {
                function RecipeItem(itemid) {
                    this.id = itemid;
                    this._db = new recipedb_1.RecipeDB();
                    this._db.init();
                }
                RecipeItem.prototype.import = function (data) {
                    $.extend(this, data);
                };
                RecipeItem.prototype.export = function () {
                    return {
                        id: this.id,
                        parent: this.parent,
                        type: this.type,
                        updated: this.updated,
                        sources: this.sources
                    };
                };
                RecipeItem.prototype.syncIDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncIDB("recipe_items", _this.export(), function () {
                            console.log("Complete syncIndexdDB() at RecipeItem.");
                            _this._db.close();
                        });
                    });
                };
                return RecipeItem;
            }());
            exports_1("RecipeItem", RecipeItem);
        }
    }
});
