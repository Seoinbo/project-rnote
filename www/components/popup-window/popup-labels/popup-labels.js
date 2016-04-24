System.register(['angular2/core', '../../../services/platform', '../../../services/config', '../../../services/util', '../../nav/nav', '../../panel/panel', '../../button/button', '../popup-window', '../../../services/label'], function(exports_1, context_1) {
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
    var core_1, platform_1, config_1, util_1, nav_1, panel_1, button_1, popup_window_1, label_1;
    var PopupLabels;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
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
                function PopupLabels(elementRef, _labelService) {
                    _super.call(this, elementRef);
                    this._labelService = _labelService;
                    this._editing = false;
                }
                PopupLabels.prototype.ngAfterViewInit = function () {
                    this.closeButtons.forEach(function (button) {
                        if (button.name == 'remove') {
                            button.ready('zoom');
                        }
                    });
                };
                // Add a new label.
                PopupLabels.prototype.add = function () {
                    var label = this._labelService.create();
                    label.syncIDB();
                    this._labelService.add(label);
                };
                PopupLabels.prototype.removeLabel = function (id) {
                    this._labelService.remove(id);
                };
                PopupLabels.prototype.enterEditMode = function () {
                    this._editing = true;
                    this.multiPanel.ibr.next();
                    // 에니매이션 효과
                    var i = 0;
                    this.closeButtons.forEach(function (button) {
                        if (button.name == 'remove') {
                            window.setTimeout(function () {
                                button.in('zoom');
                            }, config_1.Animation.intervalTime * i++);
                        }
                    });
                };
                PopupLabels.prototype.exitEditMode = function () {
                    this._editing = false;
                    this.multiPanel.ibr.prev();
                    // 에니매이션 효과
                    var i = 0;
                    this.closeButtons.forEach(function (button) {
                        if (button.name == 'remove') {
                            window.setTimeout(function () {
                                button.out('zoom');
                            }, config_1.Animation.intervalTime * i++);
                        }
                    });
                };
                __decorate([
                    core_1.ViewChild(panel_1.MultiPanel), 
                    __metadata('design:type', panel_1.MultiPanel)
                ], PopupLabels.prototype, "multiPanel", void 0);
                __decorate([
                    core_1.ViewChildren(button_1.Button), 
                    __metadata('design:type', core_1.QueryList)
                ], PopupLabels.prototype, "closeButtons", void 0);
                PopupLabels = __decorate([
                    core_1.Component({
                        selector: 'popup-window[labels]',
                        templateUrl: platform_1.Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('directives/view-object/view-object.css'),
                            platform_1.Platform.prependBaseURL('components/popup-window/popup-window.css'),
                            platform_1.Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
                            platform_1.Platform.prependBaseURL('components/nav/nav.css'),
                            platform_1.Platform.prependBaseURL('components/panel/panel.css')
                        ],
                        directives: [
                            nav_1.Nav,
                            nav_1.NavTitle,
                            panel_1.Panel,
                            panel_1.MultiPanel,
                            button_1.Button
                        ],
                        pipes: [
                            util_1.exceptRemoved
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, label_1.LabelService])
                ], PopupLabels);
                return PopupLabels;
            }(popup_window_1.PopupWindow));
            exports_1("PopupLabels", PopupLabels);
        }
    }
});
