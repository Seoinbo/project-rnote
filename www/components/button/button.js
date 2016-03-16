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
    var Button;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Button = (function () {
                function Button(elementRef) {
                    this.title = '';
                    this.element = elementRef.nativeElement;
                }
                Button.prototype.ngOnInit = function () {
                    this.elEffect = this.element.querySelector('effect');
                    this.initEffect();
                };
                Button.prototype.initEffect = function () {
                    var _this = this;
                    this.element.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.activeEffect();
                    }, true);
                    this.elEffect.addEventListener("transitionend", function () {
                        _this.onEffectComplete();
                    });
                };
                Button.prototype.activeEffect = function () {
                    this.elEffect.setAttribute('active-effect', '');
                };
                Button.prototype.onEffectComplete = function () {
                    this.elEffect.removeAttribute('active-effect');
                };
                Button = __decorate([
                    core_1.Component({
                        selector: '.btn-default',
                        templateUrl: 'components/button/button.html',
                        styleUrls: ['components/button/button.css'],
                        inputs: [
                            'title'
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
