System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Platform;
    return {
        setters:[],
        execute: function() {
            (function (Platform) {
                Platform.BROWSER = 'browser';
                Platform.ANDROID = 'android';
                Platform.IOS = 'ios';
                var baseURL = "";
                function prependBaseURL(url) {
                    return getBaseURL() + url;
                }
                Platform.prependBaseURL = prependBaseURL;
                function getBaseURL() {
                    var prefix = "";
                    if (getPlatform() != Platform.BROWSER) {
                        prefix = getPlatform() + "_asset/www/";
                        ;
                    }
                    return prefix;
                }
                Platform.getBaseURL = getBaseURL;
                function getPlatform() {
                    // Detect platform name
                    if (!Platform.platform) {
                        Platform.platform = document.querySelector("meta[name=platform]").getAttribute('content');
                    }
                    return Platform.platform;
                }
                Platform.getPlatform = getPlatform;
                function setPlatform(pf) {
                    Platform.platform = pf;
                }
                Platform.setPlatform = setPlatform;
            })(Platform = Platform || (Platform = {}));
            exports_1("Platform", Platform);
        }
    }
});
