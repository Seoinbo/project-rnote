System.register(['angular2/core', 'angular2/router', '../services/platform', '../services/util', '../services/user-account', './list/list', './view/view', './view/header/header', './nav/nav', './panel/panel', './button/button', './popup-menu/popup-menu', '../services/recipe', '../services/label', '../services/popup'], function(exports_1, context_1) {
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
    var core_1, router_1, platform_1, util_1, user_account_1, list_1, view_1, header_1, nav_1, panel_1, button_1, popup_menu_1, recipe_1, label_1, popup_1;
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
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (user_account_1_1) {
                user_account_1 = user_account_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
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
            function (popup_menu_1_1) {
                popup_menu_1 = popup_menu_1_1;
            },
            function (recipe_1_1) {
                recipe_1 = recipe_1_1;
            },
            function (label_1_1) {
                label_1 = label_1_1;
            },
            function (popup_1_1) {
                popup_1 = popup_1_1;
            }],
        execute: function() {
            Recipenote = (function () {
                function Recipenote(_elementRef, _recipeService, _labelService, _popupService, _userAccount, _dcl, _injector, _zone) {
                    this._elementRef = _elementRef;
                    this._recipeService = _recipeService;
                    this._labelService = _labelService;
                    this._popupService = _popupService;
                    this._userAccount = _userAccount;
                    this._dcl = _dcl;
                    this._injector = _injector;
                    this._zone = _zone;
                    this._recipes = recipe_1.gRecipes;
                    this._labelListActivation = false;
                    this._element = this._elementRef.nativeElement;
                    // test-userAccount
                    this._userAccount.user = {
                        id: 'g1625346125341653'
                    };
                    this._labelService.userid = this._userAccount.user.id;
                    this._recipeService.userid = this._userAccount.user.id;
                    // register containerRef of popup-window.
                    this._popupService.setViewContainer(this._elementRef);
                }
                Recipenote.prototype.ngOnInit = function () {
                    var _this = this;
                    this._labelService.downloadAll(function () {
                        _this._zone.run(function () { });
                    });
                    this._recipeService.downloadAll(function () {
                        _this._zone.run(function () { });
                    });
                };
                Recipenote.prototype.ngAfterViewInit = function () {
                    util_1.Util.extractViewChildren(this, [this.arrPopupMenu]);
                };
                // 팝업 윈도우 열기.
                Recipenote.prototype.openWindow = function (type) {
                    // console.log(this._popupService);
                    this._popupService.openLabel();
                };
                Recipenote.prototype.toggleLabelList = function () {
                    if (this._labelListActivation) {
                        this._labelListActivation = false;
                    }
                    else {
                        this._labelListActivation = true;
                    }
                };
                Recipenote.prototype.addRecipe = function () {
                    var newRecipe = this._recipeService.create();
                    this._recipeService.add(newRecipe);
                    newRecipe.syncIDB();
                };
                Object.defineProperty(Recipenote.prototype, "recipes", {
                    get: function () {
                        return this._recipes;
                    },
                    set: function (value) {
                        this._recipes = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.ViewChild(view_1.View), 
                    __metadata('design:type', view_1.View)
                ], Recipenote.prototype, "view", void 0);
                __decorate([
                    core_1.ViewChildren(popup_menu_1.PopupMenu), 
                    __metadata('design:type', core_1.QueryList)
                ], Recipenote.prototype, "arrPopupMenu", void 0);
                Recipenote = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: platform_1.Platform.prependBaseURL('components/recipenote.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/recipenote.css'),
                            platform_1.Platform.prependBaseURL('components/nav/nav.css'),
                            platform_1.Platform.prependBaseURL('components/panel/panel.css'),
                            platform_1.Platform.prependBaseURL('components/list/list.css'),
                            platform_1.Platform.prependBaseURL('components/popup-menu/popup-menu.css')
                        ],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            nav_1.Nav,
                            panel_1.Panel,
                            list_1.List,
                            list_1.ListItem,
                            view_1.View,
                            header_1.ViewHeader,
                            button_1.Button,
                            popup_menu_1.PopupMenu
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            recipe_1.RecipeService,
                            label_1.LabelService,
                            popup_1.PopupService,
                            user_account_1.UserAccount
                        ],
                        pipes: [
                            util_1.JSON2Array,
                            util_1.exceptRemoved
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, recipe_1.RecipeService, label_1.LabelService, popup_1.PopupService, user_account_1.UserAccount, core_1.DynamicComponentLoader, core_1.Injector, core_1.NgZone])
                ], Recipenote);
                return Recipenote;
            }());
            exports_1("Recipenote", Recipenote);
        }
    }
});
