System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config, DBConfig;
    return {
        setters:[],
        execute: function() {
            (function (Config) {
                // 서버에서 현재 시간을 받아온다.
                function now() {
                    return new Date().getTime();
                }
                Config.now = now;
            })(Config = Config || (Config = {}));
            exports_1("Config", Config);
            (function (DBConfig) {
                DBConfig.VERSION = 1;
                DBConfig.DB_RNOTE = 'rnote';
                DBConfig.TB_RECIPES = 'recipes';
            })(DBConfig = DBConfig || (DBConfig = {}));
            exports_1("DBConfig", DBConfig);
        }
    }
});
