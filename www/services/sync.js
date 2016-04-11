System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Sync;
    return {
        setters:[],
        execute: function() {
            Sync = (function () {
                function Sync() {
                }
                // 둘 중 가장 최신 데이터가 무엇인지 판단.
                Sync.prototype.compare = function (a, b) {
                    if (a.updated > b.updated) {
                        return 1;
                    }
                    else if (a.updated < b.updated) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                };
                Sync.prototype.run = function (src, dest) {
                    return;
                };
                Sync.prototype.merge = function (src, dest) {
                    return $.extend(dest, src);
                };
                return Sync;
            }());
            exports_1("Sync", Sync);
        }
    }
});
