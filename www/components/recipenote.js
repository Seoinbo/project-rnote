System.register(['angular2/core', 'angular2/router', '../services/platform', './list/list', './view/view', './sidebar/sidebar', './nav/nav', './panel/panel', './button/button', '../services/recipe'], function(exports_1, context_1) {
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
    var core_1, router_1, platform_1, list_1, view_1, sidebar_1, nav_1, panel_1, button_1, recipe_1;
    var Recipenote;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
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
            function (nav_1_1) {
                nav_1 = nav_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (recipe_1_1) {
                recipe_1 = recipe_1_1;
            }],
        execute: function() {
            Recipenote = (function () {
                function Recipenote(elementRef) {
                    this.onChangeSidebarDisplay = new core_1.EventEmitter();
                    this._sidebarActive = false;
                    this.recipes = [
                        { id: 0, name: 'itemA' },
                        { id: 0, name: 'itemB' }
                    ];
                    this._element = elementRef.nativeElement;
                }
                Recipenote.prototype.ngOnInit = function () {
                };
                Recipenote.prototype.ngAfterViewInit = function () {
                    this.navTitle.text = 'test';
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
                __decorate([
                    core_1.ViewChild(nav_1.NavTitle), 
                    __metadata('design:type', nav_1.NavTitle)
                ], Recipenote.prototype, "navTitle", void 0);
                __decorate([
                    core_1.ViewChild(view_1.View), 
                    __metadata('design:type', view_1.View)
                ], Recipenote.prototype, "view", void 0);
                Recipenote = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: platform_1.Platform.prependBaseURL('components/recipenote.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/recipenote.css'),
                            platform_1.Platform.prependBaseURL('components/nav/nav.css'),
                            platform_1.Platform.prependBaseURL('components/panel/panel.css'),
                            platform_1.Platform.prependBaseURL('components/view/view.css'),
                            platform_1.Platform.prependBaseURL('components/list/list.css')
                        ],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            nav_1.Nav,
                            nav_1.NavTitle,
                            panel_1.Panel,
                            list_1.List,
                            list_1.RecipeItem,
                            view_1.View,
                            sidebar_1.Sidebar,
                            button_1.Button
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            recipe_1.RecipeService
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
