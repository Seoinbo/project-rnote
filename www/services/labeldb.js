System.register(['./db'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var db_1;
    var LabelDB;
    return {
        setters:[
            function (db_1_1) {
                db_1 = db_1_1;
            }],
        execute: function() {
            // for IndexedDB
            LabelDB = (function (_super) {
                __extends(LabelDB, _super);
                function LabelDB() {
                    _super.call(this);
                }
                return LabelDB;
            }(db_1.DB));
            exports_1("LabelDB", LabelDB);
        }
    }
});
