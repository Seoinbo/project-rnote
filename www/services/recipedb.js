System.register(['./db'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var db_1;
    var RecipeDB;
    return {
        setters:[
            function (db_1_1) {
                db_1 = db_1_1;
            }],
        execute: function() {
            // for IndexedDB
            RecipeDB = (function (_super) {
                __extends(RecipeDB, _super);
                function RecipeDB() {
                    _super.call(this);
                }
                RecipeDB.prototype.init = function () {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.version(RecipeDB.VERSION).stores({
                        recipes: "id",
                        recipe_items: "id, parent",
                        labels: "id"
                    });
                };
                return RecipeDB;
            }(db_1.DB));
            exports_1("RecipeDB", RecipeDB);
        }
    }
});
