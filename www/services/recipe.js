System.register(['angular2/core', './util', './config', './recipedb'], function(exports_1, context_1) {
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
    var core_1, util_1, config_1, recipedb_1;
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
                    this._db = new recipedb_1.RecipeDB();
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
                Recipe.prototype.__syncIndexdDB = function () {
                    var _this = this;
                    if (!this._db) {
                        this._db.init();
                    }
                    console.log("sync");
                    // this._db.sync(gRecipes);
                    this._db.open().then(function () {
                        _this._db.table("recipes").get(_this.id)
                            .then(function (recipeData) {
                            console.log(recipeData);
                            if (recipeData) {
                                console.log(recipeData);
                                if (_this.updated > recipeData.updated) {
                                    _this._db.table("recipes").put(_this)
                                        .catch(function (error) {
                                        console.log(error);
                                    });
                                }
                                else {
                                    _this.import(recipeData);
                                }
                            }
                            else {
                                _this._db.table("recipes").add(_this)
                                    .catch(function (error) {
                                    // console.log(error);
                                });
                            }
                            _this.import(recipeData);
                        }).catch(function (error) {
                            console.log('error: ', error);
                        });
                    }).finally(function () {
                        // this._db.close();
                    });
                };
                Recipe.prototype.syncIndexdDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncArray("recipes", util_1.Util.JSON2Array(gRecipes), function () {
                            console.log("complete syncArray()");
                            _this._db.close();
                        });
                    });
                };
                return Recipe;
            }());
            exports_1("Recipe", Recipe);
            RecipeItem = (function () {
                function RecipeItem(itemid) {
                    this.id = itemid;
                    this._db = new recipedb_1.RecipeDB();
                }
                RecipeItem.prototype.import = function (data, overwrite) {
                    if (overwrite === void 0) { overwrite = false; }
                    if (overwrite) {
                        this._data = data;
                    }
                    else {
                        this._data = $.extend(this._data, data);
                    }
                    this.id = this._data.id;
                };
                RecipeItem.prototype.export = function () {
                    return this._data;
                };
                // Sync recipes between memory and IndexedDB(localStorage)
                RecipeItem.prototype.__syncIndexdDB = function () {
                    var _this = this;
                    if (!this._db) {
                        this._db.init();
                    }
                    this._db.open().then(function () {
                        _this._db.table("recipes").get(_this.id)
                            .then(function (recipeData) {
                            console.log(recipeData);
                            if (recipeData) {
                                console.log(recipeData);
                                if (_this.updated > recipeData.updated) {
                                    _this._db.table("recipes").put(_this._data)
                                        .catch(function (error) {
                                        console.log(error);
                                    });
                                }
                                else {
                                    _this.import(recipeData);
                                }
                            }
                            else {
                                _this._db.table("recipes").add(_this._data)
                                    .catch(function (error) {
                                    // console.log(error);
                                });
                            }
                            _this.import(recipeData);
                        }).catch(function (error) {
                            console.log('error: ', error);
                        });
                    }).finally(function () {
                        // this._db.close();
                    });
                };
                RecipeItem.prototype.syncIndexdDB = function () {
                    var _this = this;
                    window.setTimeout(function () {
                        _this.__syncIndexdDB();
                    }, 0);
                };
                Object.defineProperty(RecipeItem.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RecipeItem.prototype, "updated", {
                    // return unix-timestamp
                    get: function () {
                        return this._data.updated;
                    },
                    set: function (unixTimestamp) {
                        this._data.updated = unixTimestamp;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RecipeItem.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (value) {
                        this._data = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RecipeItem;
            }());
            exports_1("RecipeItem", RecipeItem);
        }
    }
});
