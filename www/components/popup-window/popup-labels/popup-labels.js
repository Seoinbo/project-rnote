System.register(['angular2/core', 'ng2-dragula/ng2-dragula', '../../../services/platform', '../../../services/util', '../../../directives/view-object/view-object', '../../../directives/animate/animate', '../../../directives/slip-sortable/slip-sortable', '../../nav/nav', '../../panel/panel', '../../button/button', '../popup-window', '../../../services/label'], function(exports_1, context_1) {
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
    var core_1, ng2_dragula_1, platform_1, util_1, view_object_1, animate_1, slip_sortable_1, nav_1, panel_1, button_1, popup_window_1, label_1;
    var PopupLabels;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_dragula_1_1) {
                ng2_dragula_1 = ng2_dragula_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (slip_sortable_1_1) {
                slip_sortable_1 = slip_sortable_1_1;
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
            function (popup_window_1_1) {
                popup_window_1 = popup_window_1_1;
            },
            function (label_1_1) {
                label_1 = label_1_1;
            }],
        execute: function() {
            PopupLabels = (function (_super) {
                __extends(PopupLabels, _super);
                function PopupLabels(elementRef, _labelService, _dragulaService) {
                    _super.call(this, elementRef);
                    this._labelService = _labelService;
                    this._dragulaService = _dragulaService;
                    this._currentFocusIndex = 0;
                    this._editingStates = [];
                    this._mode = 'view'; // 'view'|'select'
                }
                PopupLabels.prototype.ngAfterViewInit = function () {
                };
                // Add a new label.
                PopupLabels.prototype.add = function () {
                    var label = this._labelService.create();
                    label.syncIDB();
                    this._labelService.add(label);
                    this._focusNext(this._labelService.labels.size() - 1);
                };
                PopupLabels.prototype.removeLabel = function (id) {
                    this._labelService.remove(id);
                };
                PopupLabels.prototype.select = function (recipeID) {
                    this._currentRecipeID = recipeID;
                    this._mode = 'select';
                    this.open();
                };
                PopupLabels.prototype.view = function () {
                    this._currentRecipeID = null;
                    this._mode = 'view';
                    this.open();
                };
                PopupLabels.prototype._focusNext = function (prevIndex) {
                    var _this = this;
                    window.setTimeout(function () {
                        var children = _this._element.querySelectorAll('.content li.label .title input[type=text]');
                        var length = children.length;
                        var current = _this._currentFocusIndex;
                        if (prevIndex) {
                            current = prevIndex;
                        }
                        if (current > length - 1) {
                            current = length - 1;
                        }
                        for (var i = 0; i <= length; i++) {
                            if (current == i) {
                                children[i].focus();
                                break;
                            }
                        }
                    }, 0);
                };
                PopupLabels.prototype._onFocusName = function (index) {
                    this._editingStates[index] = true;
                    this._currentFocusIndex = index;
                };
                PopupLabels.prototype._onFocusOutName = function (index, label) {
                    this._editingStates[index] = false;
                    // Sync label-name with IDB.
                    if (label.changed('name')) {
                        label.touch().syncIDB();
                    }
                };
                PopupLabels.prototype._onChangeCheckbox = function (e, label) {
                    var target = e.target;
                    if (target.checked) {
                        label.recipes.push(this._currentRecipeID);
                    }
                    else {
                        util_1.Util.removeArrayElementByValue(label.recipes, this._currentRecipeID);
                    }
                    // Sync label-data with IDB.
                    if (label.changed('recipes')) {
                        label.touch().syncIDB();
                    }
                };
                PopupLabels.prototype._reorderList = function (e) {
                    var index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
                    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
                    var nextIndex = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
                    var temp = this._labelService.labels.elementAtIndex(index);
                    this._labelService.labels.removeElementAtIndex(index);
                    this._labelService.labels.add(temp, nextIndex);
                    var i = 0;
                    this._labelService.labels.forEach(function (item) {
                        item.index = i++;
                        item.touch().syncIDB();
                    });
                    console.log("reorderEvent: ", index, nextIndex);
                    return false;
                };
                PopupLabels.prototype._beforewait = function (e) {
                };
                __decorate([
                    core_1.ViewChildren(animate_1.Animate), 
                    __metadata('design:type', core_1.QueryList)
                ], PopupLabels.prototype, "arrAnimate", void 0);
                PopupLabels = __decorate([
                    core_1.Component({
                        selector: 'popup-window[labels]',
                        templateUrl: platform_1.Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('directives/animate/animate.css'),
                            platform_1.Platform.prependBaseURL('components/popup-window/popup-window.css'),
                            platform_1.Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
                            platform_1.Platform.prependBaseURL('components/nav/nav.css'),
                            platform_1.Platform.prependBaseURL('components/panel/panel.css'),
                            platform_1.Platform.prependBaseURL('directives/slip-sortable/slip-sortable.css'),
                        ],
                        directives: [
                            ng2_dragula_1.Dragula,
                            slip_sortable_1.SlipSortable,
                            animate_1.Animate,
                            nav_1.Nav,
                            nav_1.NavTitle,
                            panel_1.Panel,
                            button_1.Button,
                            view_object_1.ViewObject
                        ],
                        viewProviders: [
                            ng2_dragula_1.DragulaService
                        ],
                        pipes: [
                            util_1.exceptRemoved
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, label_1.LabelService, ng2_dragula_1.DragulaService])
                ], PopupLabels);
                return PopupLabels;
            }(popup_window_1.PopupWindow));
            exports_1("PopupLabels", PopupLabels);
        }
    }
});
