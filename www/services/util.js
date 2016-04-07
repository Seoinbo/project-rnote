System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var JSON2Array, Util, String;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            JSON2Array = (function () {
                function JSON2Array() {
                }
                JSON2Array.prototype.transform = function (objects, args) {
                    var objectArray = [];
                    for (var key in objects) {
                        var item = objects[key];
                        item._key = key;
                        objectArray.push(item);
                    }
                    return objectArray;
                };
                JSON2Array = __decorate([
                    core_1.Pipe({ name: 'JSON2Array', pure: false }), 
                    __metadata('design:paramtypes', [])
                ], JSON2Array);
                return JSON2Array;
            }());
            exports_1("JSON2Array", JSON2Array);
            (function (Util) {
                function extractViewChildren(parent, arr) {
                    arr.forEach(function (list) {
                        list.forEach(function (item) {
                            parent[String.toCamelCase(item.id)] = item;
                        });
                    });
                }
                Util.extractViewChildren = extractViewChildren;
                // 자바스크립트 타임스템프 값을 유닉스 타임스템프 값으로 변환 반환.
                function toUnixTimestamp(time) {
                    return Math.round(time / 1000);
                }
                Util.toUnixTimestamp = toUnixTimestamp;
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
