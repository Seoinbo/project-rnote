System.register(['dexie'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var dexie_1;
    var RecipeDB;
    return {
        setters:[
            function (dexie_1_1) {
                dexie_1 = dexie_1_1;
            }],
        execute: function() {
            RecipeDB = (function (_super) {
                __extends(RecipeDB, _super);
                function RecipeDB() {
                    _super.call(this, RecipeDB.DB_RNOTE);
                }
                RecipeDB.prototype.init = function () {
                    if (this._db && this._db.isOpen()) {
                        this._db.close();
                    }
                    this._db = new dexie_1.default(RecipeDB.DB_RNOTE);
                    this._db.version(RecipeDB.VERSION).stores({
                        recipes: "id",
                        recipe_item: "id"
                    });
                };
                RecipeDB.prototype.index = function (index) {
                    this._db.version(RecipeDB.VERSION).stores(index);
                };
                RecipeDB.VERSION = 1;
                RecipeDB.DB_RNOTE = 'rnote';
                return RecipeDB;
            }(dexie_1.default));
            exports_1("RecipeDB", RecipeDB);
        }
    }
});
//# sourceMappingURL=syncDB.js.map