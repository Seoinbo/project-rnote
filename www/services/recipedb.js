System.register(['./util', 'dexie'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var util_1, dexie_1;
    var RecipeDB;
    return {
        setters:[
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (dexie_1_1) {
                dexie_1 = dexie_1_1;
            }],
        execute: function() {
            // for IndexedDB
            RecipeDB = (function (_super) {
                __extends(RecipeDB, _super);
                // public recipes: Dexie.Table<IRecipe, string>
                // public recipe_items: Dexie.Table<IRecipe, string>
                function RecipeDB() {
                    _super.call(this, RecipeDB.DB_RNOTE);
                    this.on("error", function (e) {
                        console.log(e);
                    });
                }
                RecipeDB.prototype.init = function () {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.version(RecipeDB.VERSION).stores({
                        recipes: "id",
                        recipe_items: "id, parent"
                    });
                };
                // src - local data
                RecipeDB.prototype.__syncIDB = function (tableName, src, complete) {
                    if (src instanceof Array === false) {
                        src = [src];
                    }
                    var store = this.table(tableName);
                    var length = src.length;
                    var count = 0;
                    var res = [];
                    var _loop_1 = function(i) {
                        store.get(src[i].id).then(function (item) {
                            if (item) {
                                if (src[i].updated > item.updated) {
                                    store.put(src[i]).then(function () {
                                        res.push(src[i]);
                                        util_1.Util.lazyApply(++count, length, complete, res);
                                    });
                                }
                                else {
                                    src[i] = item;
                                    res.push(src[i]);
                                    util_1.Util.lazyApply(++count, length, complete, res);
                                }
                            }
                            else {
                                res.push(src[i]);
                                store.add(src[i]).then(function () {
                                    util_1.Util.lazyApply(++count, length, complete, res);
                                });
                            }
                        });
                    };
                    for (var i in src) {
                        _loop_1(i);
                    }
                };
                RecipeDB.prototype.syncIDB = function (tableName, src, complete) {
                    var _this = this;
                    window.setTimeout(function () {
                        _this.__syncIDB(tableName, src, complete);
                    }, 0);
                };
                RecipeDB.VERSION = 2;
                RecipeDB.DB_RNOTE = 'rnote';
                return RecipeDB;
            }(dexie_1.default));
            exports_1("RecipeDB", RecipeDB);
        }
    }
});
// 
// export class RecipeDBT<T, key> implements Dexie.T {
//     
// }
