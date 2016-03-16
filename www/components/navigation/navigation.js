System.register(['angular2/core', '../button/nav-button/nav-button', '../sidebar/sidebar'], function(exports_1, context_1) {
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
    var core_1, nav_button_1, sidebar_1;
    var Navigation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_button_1_1) {
                nav_button_1 = nav_button_1_1;
            },
            function (sidebar_1_1) {
                sidebar_1 = sidebar_1_1;
            }],
        execute: function() {
            Navigation = (function () {
                function Navigation(elementRef) {
                    this.sidebar = new sidebar_1.Sidebar();
                    // console.log(document.querySelector('sidebar'));
                    console.log(elementRef);
                    // this.element = elementRef.nativeElement;
                }
                Navigation.prototype.ngOnInit = function () {
                    // 네비게이션 버튼 바인딩
                    // this.element.querySelector('.menu').addEventListener('click', (e: Event) => {
                    //     e.preventDefault();
                    //     // this.sidebar.toggle();
                    // }, true);
                };
                Navigation.prototype.toggleSidebar = function () {
                    console.log(123);
                    this.sidebar.toggle();
                };
                Navigation = __decorate([
                    core_1.Component({
                        selector: 'navigation',
                        templateUrl: 'components/navigation/navigation.html',
                        styleUrls: ['components/navigation/navigation.css'],
                        directives: [
                            nav_button_1.NavButton
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Navigation);
                return Navigation;
            }());
            exports_1("Navigation", Navigation);
        }
    }
});
