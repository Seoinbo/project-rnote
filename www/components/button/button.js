System.register(['angular2/core', '../../services/platform', './click-effect/click-effect'], function(exports_1, context_1) {
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
    var core_1, platform_1, click_effect_1;
    var Button;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (click_effect_1_1) {
                click_effect_1 = click_effect_1_1;
            }],
        execute: function() {
            Button = (function () {
                function Button(_elementRef) {
                    this.title = '';
                    this.name = '';
                    this.btnClick = new core_1.EventEmitter();
                    this._element = _elementRef.nativeElement;
                }
                Button.prototype.onClick = function (e, n) {
                    // this.btnClick.emit([e, n]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Button.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Button.prototype, "name", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Button.prototype, "btnClick", void 0);
                __decorate([
                    core_1.HostListener('click', ['$event', 'name']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object, String]), 
                    __metadata('design:returntype', void 0)
                ], Button.prototype, "onClick", null);
                Button = __decorate([
                    core_1.Component({
                        selector: 'button',
                        templateUrl: platform_1.Platform.prependBaseURL('components/button/button.html'),
                        styleUrls: [platform_1.Platform.prependBaseURL('components/button/button.css')],
                        directives: [
                            click_effect_1.ClickEffect
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Button);
                return Button;
            }());
            exports_1("Button", Button);
        }
    }
});
