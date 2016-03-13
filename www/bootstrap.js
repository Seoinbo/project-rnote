System.register(['angular2/platform/browser', './components/recipenote', "angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, recipenote_1, core_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (recipenote_1_1) {
                recipenote_1 = recipenote_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(recipenote_1.Recipenote);
        }
    }
});
