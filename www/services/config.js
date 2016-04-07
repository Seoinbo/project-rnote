System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            (function (Config) {
                // 서버에서 현재 시간을 받아온다.
                function now(nocache) {
                    if (nocache === void 0) { nocache = false; }
                    return new Date().getTime();
                }
                Config.now = now;
            })(Config = Config || (Config = {}));
            exports_1("Config", Config);
        }
    }
});
