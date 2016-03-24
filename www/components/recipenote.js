System.register(['angular2/core', 'angular2/router', './navigation/navigation', './list/list', './view/view', './sidebar/sidebar', './button/nav-button/nav-button', '../directives/panel/panel'], function(exports_1, context_1) {
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
    var core_1, router_1, navigation_1, list_1, view_1, sidebar_1, nav_button_1, panel_1;
    var Recipenote;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (sidebar_1_1) {
                sidebar_1 = sidebar_1_1;
            },
            function (nav_button_1_1) {
                nav_button_1 = nav_button_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            }],
        execute: function() {
            Recipenote = (function () {
                function Recipenote(elementRef) {
                    this.onChangeSidebarDisplay = new core_1.EventEmitter();
                    this._sidebarActive = false;
                    this._element = elementRef.nativeElement;
                }
                Recipenote.prototype.ngOnInit = function () {
                };
                Recipenote.prototype.showSidebar = function () {
                    this.sidebarActive = true;
                    this.onChangeSidebarDisplay.emit(true);
                };
                Recipenote.prototype.hideSidebar = function () {
                    this.sidebarActive = false;
                    this.onChangeSidebarDisplay.emit(false);
                };
                Recipenote.prototype.toggleSidebar = function () {
                    if (this.sidebarActive) {
                        this.hideSidebar();
                    }
                    else {
                        this.showSidebar();
                    }
                };
                Object.defineProperty(Recipenote.prototype, "sidebarActive", {
                    get: function () {
                        return this._sidebarActive;
                    },
                    set: function (value) {
                        this._sidebarActive = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Recipenote.prototype, "onChangeSidebarDisplay", void 0);
                Recipenote = __decorate([
                    core_1.Component({
                        selector: 'app',
                        // templateUrl: 'recipenote.html',
                        templateUrl: 'components/recipenote.html',
                        styleUrls: ['components/recipenote.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            navigation_1.Navigation,
                            panel_1.Panel,
                            list_1.List,
                            view_1.View,
                            sidebar_1.Sidebar,
                            nav_button_1.NavButton
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Recipenote);
                return Recipenote;
            }());
            exports_1("Recipenote", Recipenote);
        }
    }
});
//# sourceMappingURL=recipenote.js.map