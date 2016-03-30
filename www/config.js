System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PLATFORM_BROWSER, PLATFORM_ANDROID, PLATFORM_IOS;
    return {
        setters:[],
        execute: function() {
            // Define platforms
            exports_1("PLATFORM_BROWSER", PLATFORM_BROWSER = 'android');
            exports_1("PLATFORM_ANDROID", PLATFORM_ANDROID = 'android');
            exports_1("PLATFORM_IOS", PLATFORM_IOS = 'ios');
        }
    }
});
