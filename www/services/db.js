System.register(['./util', 'dexie'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var util_1, dexie_1;
    var DB;
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
            DB = (function (_super) {
                __extends(DB, _super);
                function DB() {
                    _super.call(this, DB.DB_RNOTE);
                    this.on("error", function (e) {
                        console.log(e);
                    });
                }
                DB.prototype.init = function () {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.version(DB.VERSION).stores({
                        recipes: "id",
                        recipe_items: "id, parent, index",
                        labels: "id, index"
                    });
                };
                // src - local data
                DB.prototype.__syncIDB = function (tableName, src, complete) {
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
                                        util_1.Util.lazyApply(++count, length, complete, [res]);
                                    });
                                }
                                else if (src[i].updated < item.updated) {
                                    src[i] = item;
                                    res.push(src[i]);
                                    util_1.Util.lazyApply(++count, length, complete, [res]);
                                }
                                else
                                    ;
                            }
                            else {
                                res.push(src[i]);
                                store.add(src[i]).then(function () {
                                    util_1.Util.lazyApply(++count, length, complete, [res]);
                                });
                            }
                        }).catch(function (e) {
                            console.log(e);
                        });
                    };
                    for (var i in src) {
                        _loop_1(i);
                    }
                };
                DB.prototype.syncIDB = function (tableName, src, complete) {
                    var _this = this;
                    window.setTimeout(function () {
                        _this.__syncIDB(tableName, src, complete);
                    }, 0);
                };
                DB.VERSION = 2;
                DB.DB_RNOTE = 'rnote';
                return DB;
            }(dexie_1.default));
            exports_1("DB", DB);
        }
    }
});
//
// export class RecipeDBT<T, key> implements Dexie.T {
//
// }
