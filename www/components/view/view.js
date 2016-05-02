System.register(['angular2/core', '../../services/util', '../../services/platform', '../../services/collections/LinkedList', '../../services/recipe', '../../services/popup', '../../directives/view-object/view-object', './baseline/baseline', './header/header', './empty-msg/empty-msg', '../nav/nav', '../panel/panel', '../button/button', '../popup-menu/popup-menu'], function(exports_1, context_1) {
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
    var core_1, util_1, platform_1, LinkedList_1, recipe_1, popup_1, view_object_1, baseline_1, header_1, empty_msg_1, nav_1, panel_1, button_1, popup_menu_1;
    var View;
    function viewComponentObject(type) {
        var component;
        switch (type) {
            case 'empty-msg':
                component = empty_msg_1.ViewEmptyMsg;
                break;
            case 'header':
                component = header_1.ViewHeader;
                break;
        }
        return component;
    }
    exports_1("viewComponentObject", viewComponentObject);
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
            function (recipe_1_1) {
                recipe_1 = recipe_1_1;
            },
            function (popup_1_1) {
                popup_1 = popup_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            },
            function (baseline_1_1) {
                baseline_1 = baseline_1_1;
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
                function View(elementRef, _dcl, _popupService, _recipeService) {
                    _super.call(this, elementRef);
                    this._dcl = _dcl;
                    this._popupService = _popupService;
                    this._recipeService = _recipeService;
                    this.eClose = new core_1.EventEmitter();
                    // view-object instances
                    this.viewComponents = new LinkedList_1.LinkedList();
                }
                View.prototype.ngAfterViewInit = function () {
                    util_1.Util.extractViewChildren(this, [this.arrPopupMenu]);
                };
                View.prototype.open = function (recipeID) {
                    if (recipeID) {
                        this.load(recipeID);
                    }
                };
                View.prototype.close = function () {
                    this.eClose.next({});
                };
                View.prototype.load = function (recipeID) {
                    var _this = this;
                    if (!recipe_1.gRecipes[recipeID]) {
                        console.log("Not exsists recipe data.");
                        return false;
                    }
                    this.recipe = recipe_1.gRecipes[recipeID];
                    this.recipe.syncChildrenIDB(function (childrenData) {
                        console.log("load: ", recipeID, "size: ", childrenData.size());
                        _this._syncDisplay(childrenData);
                    });
                    return true;
                };
                // 화면에 뿌려진 뷰-오브젝트와 IDB데이터를 동기화.
                View.prototype._syncDisplay = function (childrenData) {
                    var _this = this;
                    var dbIDList = [];
                    childrenData.forEach(function (data) {
                        dbIDList.push(data.id);
                    });
                    // DB에 없는 컴포넌트는 화면에서 제거.
                    if (!this.viewComponents.isEmpty()) {
                        this.viewComponents.forEach(function (ref) {
                            if (dbIDList.indexOf(ref.instance.id) == -1) {
                                _this.removeViewComponent(ref.instance.id);
                            }
                        });
                    }
                    // 화면에 없는 컴포넌트 추가(랜더링)하기.
                    this.addViewComponentByNode(childrenData.firstNode, function () {
                        // ...code here
                    });
                };
                View.prototype._getViewComponentByID = function (itemID) {
                    var retv = null;
                    this.viewComponents.forEach(function (item) {
                        if (itemID == item.instance.id) {
                            retv = item;
                            return false;
                        }
                    });
                    return retv;
                };
                // 이미 화면에 뿌려져 있는 뷰-아이템인가?
                View.prototype._alreadyDisplayd = function (itemID) {
                    if (this._getViewComponentByID(itemID)) {
                        return true;
                    }
                    return false;
                };
                // DB에 없는 새 컴포넌트 아이템을 생성.
                View.prototype.createViewComponent = function (type, complete) {
                    var data = this.recipe.createChild(type);
                    this.recipe.addChild(data);
                    this.addViewComponent(data, complete);
                };
                // 새 뷰-오브젝트 아이템을 추가.
                // index - 아이템을 append할 위치값
                View.prototype.addViewComponent = function (data, complete) {
                    var _this = this;
                    // 해당 타겟의 아래에 컴포넌트를 추가. ('baseline'은 최상단에 숨겨놓은 엘리먼트)
                    // 뷰 페이지가 빈 상태이면 이 것을 기준으로 아이템을 append 한다.
                    var target = this.baseline;
                    var component = viewComponentObject(data.type);
                    // 이미 뷰에 존재한다면, 데이터만 업데이트한다.
                    var componentRef = this._getViewComponentByID(data.id);
                    if (componentRef) {
                        console.log("already displayed: ", data.id);
                        componentRef.instance.import(data);
                        if (complete) {
                            complete.apply(null, [componentRef]);
                        }
                        return true;
                    }
                    // 삽입할 위치 선정.
                    if (data.index) {
                        var temp = this.viewComponents.elementAtIndex(data.index - 1);
                        if (temp) {
                            target = temp.instance;
                        }
                    }
                    // 화면에 랭더링.
                    this._dcl.loadNextToLocation(component, target.elementRef).then(function (cref) {
                        console.log("add new component to display: ", data.id);
                        var item = cref.instance;
                        item.viewid = data.id;
                        item.import(data);
                        // 중간에 아이템이 추가되면 인덱스 번호 재정렬
                        // if (headIndex) {
                        //     this._sortIndex(this.items);
                        // }
                        item.syncIDB();
                        _this.viewComponents.add(cref);
                        if (complete) {
                            complete.apply(null, [cref]);
                        }
                    });
                    return true;
                };
                // LinkedList를 이용해 컴포넌트 추가 작업을 동기(sync)로 수행한다.
                // -> DCL을 통한 컴포넌트 랜더링 작업은 비동기로 수행된다.
                View.prototype.addViewComponentByNode = function (node, complete) {
                    var _this = this;
                    var data = node.element;
                    this.addViewComponent(data, function (item) {
                        if (!node.next) {
                            if (complete) {
                                complete.apply(null, []);
                            }
                            return false;
                        }
                        _this.addViewComponentByNode(node.next, complete);
                    });
                };
                View.prototype.removeViewComponent = function (instanceID) {
                    var componentRef = this._getViewComponentByID(instanceID);
                    this._removeViewComponentByRef(componentRef);
                };
                View.prototype._removeViewComponentByRef = function (cref) {
                    if (cref) {
                        this.viewComponents.remove(cref);
                        cref.dispose();
                        console.log('remove a component from display: ', cref.instance.id);
                    }
                    else {
                        this.viewComponents.clear();
                        this.viewComponents.forEach(function (r) {
                            r.dispose();
                        });
                        console.log('remove all component from display, total => ', this.viewComponents.size());
                    }
                };
                // 현재 보고 있는 레시피를 휴지통에 버림.
                View.prototype.remove = function () {
                    this.recipe.remove();
                };
                View.prototype.openLabelWindow = function () {
                    this._popupService.openLabel(this.recipe.id);
                };
                View.prototype._sortIndex = function (items) {
                    if (items) {
                        var i_1 = 0;
                        items.forEach(function (item) {
                            item.index = i_1++;
                        });
                    }
                    return items;
                };
                Object.defineProperty(View.prototype, "recipe", {
                    get: function () {
                        return this._recipe;
                    },
                    set: function (r) {
                        this._recipe = r;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.ViewChild(baseline_1.Baseline), 
                    __metadata('design:type', baseline_1.Baseline)
                ], View.prototype, "baseline", void 0);
                __decorate([
                    core_1.ViewChildren(popup_menu_1.PopupMenu), 
                    __metadata('design:type', core_1.QueryList)
                ], View.prototype, "arrPopupMenu", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], View.prototype, "eClose", void 0);
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
                            baseline_1.Baseline,
                            nav_1.Nav,
                            nav_1.NavTitle,
                            panel_1.Panel,
                            button_1.Button,
                            popup_menu_1.PopupMenu
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, popup_1.PopupService, recipe_1.RecipeService])
                ], View);
                return View;
            }(view_object_1.ViewObject));
            exports_1("View", View);
        }
    }
});
