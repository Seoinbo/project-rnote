System.register(['angular2/core', './util', '../components/popup-window/popup-labels/popup-labels'], function(exports_1, context_1) {
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
    var core_1, util_1, popup_labels_1;
    var PopupService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (popup_labels_1_1) {
                popup_labels_1 = popup_labels_1_1;
            }],
        execute: function() {
            PopupService = (function () {
                function PopupService(_dcl) {
                    this._dcl = _dcl;
                    // popup-windows for cache. <ComponentRef>
                    this._popupCRefList = {};
                }
                PopupService.prototype.setViewContainer = function (container) {
                    this._container = container;
                };
                PopupService.prototype.load = function (component, complete) {
                    var _this = this;
                    var type = util_1.String.getFunctionName(component.toString());
                    if (this._popupCRefList[type] === undefined) {
                        this._dcl.loadIntoLocation(component, this._container, 'popupWindowHead').then(function (cref) {
                            _this._popupCRefList[type] = cref;
                            window.setTimeout(function () {
                                if (complete) {
                                    complete.apply(null, [cref.instance]);
                                }
                            }, 0);
                        });
                    }
                    else {
                        if (complete) {
                            complete.apply(null, [this._popupCRefList[type].instance]);
                        }
                    }
                };
                PopupService.prototype.openLabel = function (recipeID) {
                    this.load(popup_labels_1.PopupLabels, function (instance) {
                        if (recipeID) {
                            instance.select(recipeID);
                        }
                        else {
                            instance.view();
                        }
                    });
                };
                PopupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader])
                ], PopupService);
                return PopupService;
            }());
            exports_1("PopupService", PopupService);
        }
    }
});
