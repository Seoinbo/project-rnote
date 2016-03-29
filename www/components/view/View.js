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
    var View;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // import {Navigation} from '../navigation/navigation';
            View = (function () {
                function View(elementRef) {
                    this._active = false;
                    this._element = elementRef.nativeElement;
                }
                View.prototype.show = function () {
                    this._active = true;
                };
                View.prototype.hide = function () {
                    this._active = false;
                };
                Object.defineProperty(View.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (value) {
                        this._active = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                View = __decorate([
                    core_1.Directive({
                        selector: 'view',
                        host: {
                            '[attr.active]': 'active'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], View);
                return View;
            }());
            exports_1("View", View);
        }
    }
});
