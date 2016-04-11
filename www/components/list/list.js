System.register(['angular2/core', '../../services/platform', '../button/click-effect/click-effect', '../../services/recipe'], function(exports_1, context_1) {
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
    var core_1, platform_1, click_effect_1, recipe_1;
    var List, ListItem;
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
            },
            function (recipe_1_1) {
                recipe_1 = recipe_1_1;
            }],
        execute: function() {
            List = (function () {
                function List() {
                }
                List = __decorate([
                    core_1.Directive({
                        selector: 'list'
                    }), 
                    __metadata('design:paramtypes', [])
                ], List);
                return List;
            }());
            exports_1("List", List);
            ListItem = (function () {
                function ListItem(elementRef) {
                    this._element = elementRef.nativeElement;
                }
                Object.defineProperty(ListItem.prototype, "recipe", {
                    get: function () {
                        return this._recipe;
                    },
                    set: function (value) {
                        this._recipe = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input('recipeData'), 
                    __metadata('design:type', recipe_1.Recipe)
                ], ListItem.prototype, "_recipe", void 0);
                ListItem = __decorate([
                    core_1.Component({
                        selector: 'list item',
                        templateUrl: platform_1.Platform.prependBaseURL('components/list/recipe-item.html'),
                        styleUrls: [platform_1.Platform.prependBaseURL('components/list/recipe-item.css')],
                        directives: [
                            click_effect_1.ClickEffect
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ListItem);
                return ListItem;
            }());
            exports_1("ListItem", ListItem);
        }
    }
});
