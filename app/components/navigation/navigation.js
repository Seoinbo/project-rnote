System.register(['angular2/core', '../button/nav-button/nav-button'], function(exports_1, context_1) {
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
    var core_1, nav_button_1;
    var Navigation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_button_1_1) {
                nav_button_1 = nav_button_1_1;
            }],
        execute: function() {
            Navigation = (function () {
                function Navigation() {
                }
                Navigation = __decorate([
                    core_1.Component({
                        selector: 'navigation',
                        templateUrl: 'components/navigation/navigation.html',
                        styleUrls: ['components/navigation/navigation.css'],
                        directives: [
                            nav_button_1.NavButton
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Navigation);
                return Navigation;
            }());
            exports_1("Navigation", Navigation);
        }
    }
});
//# sourceMappingURL=navigation.js.map