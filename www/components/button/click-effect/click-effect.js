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
    var ClickEffect;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ClickEffect = (function () {
                function ClickEffect(_elementRef) {
                    this._elementRef = _elementRef;
                    this.animating = false;
                    this._element = _elementRef.nativeElement;
                }
                ClickEffect.prototype.onMouseDown = function (btn) {
                    this.animating = true;
                };
                ClickEffect.prototype.onTransitionEnd = function () {
                    this.animating = false;
                };
                __decorate([
                    core_1.HostListener('mousedown', ['$event.target']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ClickEffect.prototype, "onMouseDown", null);
                __decorate([
                    core_1.HostListener('transitionend'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], ClickEffect.prototype, "onTransitionEnd", null);
                ClickEffect = __decorate([
                    core_1.Component({
                        selector: 'click-effect',
                        template: '',
                        styleUrls: ['components/button/click-effect/click-effect.css'],
                        host: {
                            '[attr.animating]': 'animating'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ClickEffect);
                return ClickEffect;
            }());
            exports_1("ClickEffect", ClickEffect);
        }
    }
});