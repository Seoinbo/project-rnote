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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
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
                function Navigation(_elementRef, _allNavButton) {
                    this._elementRef = _elementRef;
                    this.title = "TITLE";
                    this.btnClick = new core_1.EventEmitter();
                    this._element = _elementRef.nativeElement;
                    this._allNavButton = _allNavButton;
                }
                Navigation.prototype.ngAfterContentInit = function () {
                    this.initEvent();
                };
                Navigation.prototype.initEvent = function () {
                    var _this = this;
                    var elButtons = this._element.querySelectorAll('nav-button');
                    for (var _i = 0, elButtons_1 = elButtons; _i < elButtons_1.length; _i++) {
                        var elButton = elButtons_1[_i];
                        elButton.addEventListener('btnclick', function (e) {
                            console.log(e);
                            _this.btnClick.emit(e);
                        }, true);
                    }
                };
                Navigation.prototype.onClick = function (e) {
                    console.log('a:', e);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Navigation.prototype, "btnClick", void 0);
                Navigation = __decorate([
                    core_1.Component({
                        selector: 'nav',
                        templateUrl: 'components/navigation/navigation.html',
                        styleUrls: ['components/navigation/navigation.css'],
                        directives: [
                            nav_button_1.NavButton
                        ]
                    }),
                    __param(1, core_1.Query(nav_button_1.NavButton)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.QueryList])
                ], Navigation);
                return Navigation;
            }());
            exports_1("Navigation", Navigation);
        }
    }
});
