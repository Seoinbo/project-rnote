System.register(['angular2/platform/browser', './components/navigation/navigation'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, navigation_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(navigation_1.test);
        }
    }
});
//# sourceMappingURL=bootstrap.js.map