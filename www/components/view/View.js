System.register(['angular2/core', '../../services/util', '../../services/platform', '../../services/collections/LinkedList', '../../directives/view-object', './header/header', './empty-msg/empty-msg', '../nav/nav', '../panel/panel', '../button/button', '../popup-menu/popup-menu'], function(exports_1, context_1) {
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
    var core_1, util_1, platform_1, LinkedList_1, view_object_1, header_1, empty_msg_1, nav_1, panel_1, button_1, popup_menu_1;
    var View, DEF_VIEW_ITEM;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (empty_msg_1_1) {
                empty_msg_1 = empty_msg_1_1;
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
            }],
        execute: function() {
            View = (function (_super) {
                __extends(View, _super);
                function View(elementRef, _dcl) {
                    _super.call(this, elementRef);
                    this._dcl = _dcl;
                    this.items = new LinkedList_1.LinkedList();
                    this.storage = [
                        {
                            type: 'header',
                            text: 'hello header'
                        }
                    ];
                    this.active();
                    this.initViewItem();
                }
                View.prototype.ngAfterViewInit = function () {
                    util_1.Util.extractViewChildren(this, [this.arrPopupMenu]);
                };
                View.prototype.initViewItem = function () {
                    // this.storage.forEach( (data) => {
                    //     
                    // });
                    // this.addViewItem(ViewEmptyMsg);
                };
                View.prototype.addViewItem = function (type, data, index) {
                    var _this = this;
                    var target = this.emptyMsg, component = DEF_VIEW_ITEM[type];
                    if (this.items.size() > 0) {
                        if (index) {
                            target = this.items.elementAtIndex(index);
                        }
                        else {
                            target = this.items.last();
                        }
                    }
                    this._dcl.loadNextToLocation(component, target.elementRef).then(function (ref) {
                        ref.instance.text = "My Header2";
                        console.log(ref.instance);
                        _this.items.add(ref.instance);
                    });
                };
                __decorate([
                    core_1.ViewChild(empty_msg_1.ViewEmptyMsg), 
                    __metadata('design:type', empty_msg_1.ViewEmptyMsg)
                ], View.prototype, "emptyMsg", void 0);
                __decorate([
                    core_1.ViewChildren(popup_menu_1.PopupMenu), 
                    __metadata('design:type', core_1.QueryList)
                ], View.prototype, "arrPopupMenu", void 0);
                View = __decorate([
                    core_1.Component({
                        selector: 'view',
                        templateUrl: platform_1.Platform.prependBaseURL('components/view/view.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/view/view.css'),
                            platform_1.Platform.prependBaseURL('components/nav/nav.css'),
                            platform_1.Platform.prependBaseURL('components/panel/panel.css'),
                            platform_1.Platform.prependBaseURL('components/popup-menu/popup-menu.css')
                        ],
                        directives: [
                            header_1.ViewHeader,
                            empty_msg_1.ViewEmptyMsg,
                            nav_1.Nav,
                            nav_1.NavTitle,
                            panel_1.Panel,
                            button_1.Button,
                            popup_menu_1.PopupMenu
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader])
                ], View);
                return View;
            }(view_object_1.ViewObject));
            exports_1("View", View);
            exports_1("DEF_VIEW_ITEM", DEF_VIEW_ITEM = {
                'empty-msg': empty_msg_1.ViewEmptyMsg,
                'header': header_1.ViewHeader
            });
        }
    }
});
