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
    var Panel, MultiPanel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Panel = (function () {
                function Panel(_elementRef) {
                    this._element = _elementRef.nativeElement;
                }
                Object.defineProperty(Panel.prototype, "element", {
                    get: function () {
                        return this._element;
                    },
                    enumerable: true,
                    configurable: true
                });
                Panel = __decorate([
                    core_1.Directive({
                        selector: 'panel'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Panel);
                return Panel;
            }());
            exports_1("Panel", Panel);
            MultiPanel = (function () {
                function MultiPanel(_elementRef) {
                    this._element = _elementRef.nativeElement;
                }
                MultiPanel.prototype.ngAfterViewInit = function () {
                    var args = {
                        "wrap": this._element,
                        "mask": "panel-mask",
                        "group": {
                            "element": "panel-group",
                            "count": 1
                        },
                        "unit": "panel",
                        "startIndex": 0,
                        "play": {
                            "auto": false,
                            "direction": ibr.dir.ver,
                            "moveto": ibr.move.up,
                            "intervalTime": 2000,
                            "movingCnt": 1
                        },
                        "events": {
                            "init": function (index) { },
                            "focus": function (index) { },
                            "play": function (index) { },
                            "pause": function (index) { },
                            "timeout": function (t) { }
                        }
                    };
                    this.ibr = new ibr(args);
                };
                Object.defineProperty(MultiPanel.prototype, "element", {
                    get: function () {
                        return this._element;
                    },
                    enumerable: true,
                    configurable: true
                });
                MultiPanel = __decorate([
                    core_1.Directive({
                        selector: 'multi-panel'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], MultiPanel);
                return MultiPanel;
            }());
            exports_1("MultiPanel", MultiPanel);
        }
    }
});
