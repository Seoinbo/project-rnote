System.register(['angular2/core', './util', './config', './collections/LinkedList', '../directives/view-object/view-object', './recipedb'], function(exports_1, context_1) {
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
    var core_1, util_1, config_1, LinkedList_1, view_object_1, recipedb_1;
    var gRecipes, gRecipeIDArray, RecipeService, Recipe, RecipeItem;
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
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            },
            function (recipedb_1_1) {
                recipedb_1 = recipedb_1_1;
            }],
        execute: function() {
            exports_1("gRecipes", gRecipes = {});
            exports_1("gRecipeIDArray", gRecipeIDArray = []);
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
                            id: this._userid + '-r' + util_1.Util.uniqID(config_1.Config.now()),
                            owner: this._userid,
                            name: 'untitled',
                            updated: util_1.Util.toUnixTimestamp(config_1.Config.now()),
                            removed: false,
                            source: []
                        };
                    }
                    var recipe = new Recipe();
                    recipe.import(data);
                    return recipe;
                };
                RecipeService.prototype.add = function (recipe) {
                    gRecipes[recipe.id] = recipe;
                    gRecipeIDArray.push(recipe.id);
                };
                RecipeService.prototype.getRecipeByID = function (recipeID) {
                    return gRecipes[recipeID];
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
                function Recipe(recipeID) {
                    this._children = new LinkedList_1.LinkedList();
                    this.origin = {};
                    this.removed = false;
                    this.id = recipeID;
                    this._db = new recipedb_1.RecipeDB();
                    this._db.init();
                }
                Recipe.prototype.updateOrigin = function (forceUpdate) {
                    if (forceUpdate === void 0) { forceUpdate = false; }
                    var current = this.export();
                    if (forceUpdate || !this.origin) {
                        this.origin = $.extend(true, {}, current);
                    }
                    return this.origin;
                };
                Recipe.prototype.import = function (data) {
                    $.extend(this, data);
                    this.updateOrigin();
                    return this.export();
                };
                Recipe.prototype.export = function () {
                    return {
                        id: this.id,
                        owner: this.owner,
                        name: this.name,
                        updated: this.updated,
                        removed: this.removed,
                        source: this.source
                    };
                };
                Recipe.prototype.touch = function () {
                    this.updated = util_1.Util.toUnixTimestamp(config_1.Config.now());
                    return this;
                };
                // 'updated' 제외한 속성들이 변했는가?
                Recipe.prototype.changed = function (prop) {
                    var includes;
                    if (prop) {
                        includes = [prop];
                    }
                    return !util_1.Util.isEqual(this.origin, this.export(), includes, ['updated']);
                };
                // Sync recipes between memory and IndexedDB(localStorage)
                Recipe.prototype.syncIDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncIDB("recipes", _this.export(), function () {
                            console.log("Complete syncIndexdDB() at RecipeItem.");
                            _this.updateOrigin(true);
                            _this._db.close();
                        });
                    });
                };
                Recipe.prototype.syncChildrenIDB = function (complete) {
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
                            complete.apply(null, [_this.children]);
                        }
                    });
                };
                // 새로운 자식 아이템을 생성한다.
                Recipe.prototype.createChild = function (type) {
                    var child = {
                        id: this.id + '-i' + util_1.Util.uniqID(config_1.Config.now()),
                        index: 0,
                        parent: this.id,
                        type: type,
                        updated: util_1.Util.toUnixTimestamp(config_1.Config.now()),
                        removed: false,
                        source: []
                    };
                    return child;
                };
                Recipe.prototype.addChild = function (data, index) {
                    this.children.add(data, index);
                };
                Recipe.prototype.remove = function () {
                    this.removed = true;
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
            RecipeItem = (function (_super) {
                __extends(RecipeItem, _super);
                function RecipeItem(elementRef) {
                    _super.call(this, elementRef);
                    this.origin = {};
                    this.removed = false;
                    this._db = new recipedb_1.RecipeDB();
                    this._db.init();
                }
                RecipeItem.prototype.updateOrigin = function (forceUpdate) {
                    if (forceUpdate === void 0) { forceUpdate = false; }
                    var current = this.export();
                    if (forceUpdate || !this.origin) {
                        this.origin = $.extend(true, {}, current);
                    }
                    return this.origin;
                };
                RecipeItem.prototype.import = function (data) {
                    $.extend(this, data);
                    this.updateOrigin();
                    return this.export();
                };
                RecipeItem.prototype.export = function () {
                    return {
                        id: this.id,
                        index: this.index,
                        parent: this.parent,
                        type: this.type,
                        updated: this.updated,
                        removed: this.removed,
                        source: this.source
                    };
                };
                RecipeItem.prototype.touch = function () {
                    this.updated = util_1.Util.toUnixTimestamp(config_1.Config.now());
                    return this;
                };
                // 'updated' 제외한 속성들이 변했는가?
                RecipeItem.prototype.changed = function (prop) {
                    var includes;
                    if (prop) {
                        includes = [prop];
                    }
                    return !util_1.Util.isEqual(this.origin, this.export(), includes, ['updated']);
                };
                RecipeItem.prototype.syncIDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncIDB("recipe_items", _this.export(), function () {
                            console.log("Complete syncIndexdDB() at RecipeItem.");
                            _this.updateOrigin(true);
                            _this._db.close();
                        });
                    });
                };
                RecipeItem.prototype.remove = function () {
                    this.removed = true;
                };
                return RecipeItem;
            }(view_object_1.ViewObject));
            exports_1("RecipeItem", RecipeItem);
        }
    }
});
