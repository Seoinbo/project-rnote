System.register(['angular2/core', '../../../services/platform', '../button', '../click-effect/click-effect'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_1, button_1, click_effect_1;
    var NavButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (click_effect_1_1) {
                click_effect_1 = click_effect_1_1;
            }],
        execute: function() {
            NavButton = (function (_super) {
                __extends(NavButton, _super);
                function NavButton(elementRef) {
                    _super.call(this, elementRef);
                }
                NavButton = __decorate([
                    core_1.Component({
                        selector: 'button[nav], nav button',
                        templateUrl: platform_1.Platform.prependBaseURL('components/button/nav-button/nav-button.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/button/button.css'),
                            platform_1.Platform.prependBaseURL('components/button/nav-button/nav-button.css')
                        ],
                        directives: [
                            click_effect_1.ClickEffect
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NavButton);
                return NavButton;
            }(button_1.Button));
            exports_1("NavButton", NavButton);
        }
    }
});
