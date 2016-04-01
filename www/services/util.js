System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Util, String;
    return {
        setters:[],
        execute: function() {
            (function (Util) {
                function extractViewChildren(parent, arr) {
                    arr.forEach(function (list) {
                        list.forEach(function (item) {
                            parent[String.toCamelCase(item.id)] = item;
                        });
                    });
                }
                Util.extractViewChildren = extractViewChildren;
            })(Util = Util || (Util = {}));
            exports_1("Util", Util);
            (function (String) {
                function trim(str) {
                    return str.replace(/^\s+|\s+$/g, "");
                }
                String.trim = trim;
                function toCamelCase(str) {
                    return str.replace(/(\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
                }
                String.toCamelCase = toCamelCase;
                function toDashed(str) {
                    return str.replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); });
                }
                String.toDashed = toDashed;
                function toUnderscore(str) {
                    return str.replace(/([A-Z])/g, function ($1) { return "_" + $1.toLowerCase(); });
                }
                String.toUnderscore = toUnderscore;
            })(String = String || (String = {}));
            exports_1("String", String);
        }
    }
});
