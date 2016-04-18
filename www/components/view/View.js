System.register(['angular2/core', '../../services/util', '../../services/platform', '../../services/collections/LinkedList', '../../services/recipe', '../../services/config', '../../directives/view-object', './baseline/baseline', './header/header', './empty-msg/empty-msg', '../nav/nav', '../panel/panel', '../button/button', '../popup-menu/popup-menu'], function(exports_1, context_1) {
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
    var core_1, util_1, platform_1, LinkedList_1, recipe_1, config_1, view_object_1, baseline_1, header_1, empty_msg_1, nav_1, panel_1, button_1, popup_menu_1;
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
            function (recipe_1_1) {
                recipe_1 = recipe_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
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
                // private _elementRef: ElementRef;
                function View(elementRef, _dcl, _recipeService) {
                    _super.call(this, elementRef);
                    this._dcl = _dcl;
                    this._recipeService = _recipeService;
                    // view-object instances
                    this.viewComponents = new LinkedList_1.LinkedList();
                    // this._elementRef = elementRef;
                }
                View.prototype.ngAfterViewInit = function () {
                    util_1.Util.extractViewChildren(this, [this.arrPopupMenu]);
                };
                View.prototype.open = function (recipeID) {
                    if (recipeID) {
                        this.load(recipeID);
                    }
                    this.active();
                };
                View.prototype.load = function (recipeID) {
                    var _this = this;
                    if (!recipe_1.gRecipes[recipeID]) {
                    }
                    console.log("load: ", recipeID);
                    this.recipe = recipe_1.gRecipes[recipeID];
                    this.recipe.syncChildrenIDB(function (childrenData) {
                        console.log("list size: ", childrenData.size());
                        _this._syncDisplay(childrenData);
                    });
                };
                // 화면에 뿌려진 뷰-오브젝트와 IDB데이터를 동기화.
                View.prototype._syncDisplay = function (childrenData) {
                    var _this = this;
                    var tempIDs = [];
                    // DB 데이터를 추가하거나 업데이트.
                    childrenData.forEach(function (data) {
                        var ref = _this._getItemByID(data.id);
                        if (ref) {
                            ref.instance.import(data);
                            console.log('update view item: ', data.id);
                        }
                        tempIDs.push(data.id);
                    });
                    this._addMutilItem(childrenData.firstNode, function () {
                        // 더 이상 DB에 존재하지 않는 오브젝트는 화면에서 제거.
                        _this.viewComponents.forEach(function (ref) {
                            var i = tempIDs.indexOf(ref.instance.id);
                            if (i == -1) {
                                _this.removeItem(ref.instance.id);
                                console.log('remove view item: ', ref.instance.id);
                            }
                            else {
                                tempIDs[i] = null;
                            }
                        });
                    });
                };
                View.prototype._addMutilItem = function (node, complete) {
                    var _this = this;
                    var data = node.element;
                    this.addItem(data, function (item) {
                        console.log('add view item: ', data.id);
                        if (!node.next) {
                            if (complete) {
                                complete.apply(null, []);
                            }
                            return false;
                        }
                        _this._addMutilItem(node.next, complete);
                    });
                };
                View.prototype._getItemByID = function (itemID) {
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
                    if (this._getItemByID(itemID)) {
                        return true;
                    }
                    return false;
                };
                // IndexedDB로 부터 자식 아이템들을 모두 읽어 온다.
                View.prototype.loadItems = function () {
                    // this._recipeService.downloadItems(this.recipeID);
                    // this.storage.forEach( (data) => {
                    //
                    // });
                    // this.addItem(ViewEmptyMsg);
                };
                View.prototype._createItemData = function (type, index) {
                    return {
                        id: this.newID(),
                        index: index ? index : 0,
                        type: type,
                        parent: this.recipe.id,
                        updated: util_1.Util.toUnixTimestamp(config_1.Config.now())
                    };
                };
                View.prototype.addNewItem = function (type, complete) {
                    // 삽입될 위치 인덱스값. 목록의 마지막에 추가.
                    var index = this.viewComponents.size();
                    var data = this._createItemData(type);
                    this.addItem(data, complete);
                };
                // 새 뷰-오브젝트 아이템을 추가.
                // index - 아이템을 append할 위치값
                View.prototype.addItem = function (data, complete) {
                    var _this = this;
                    // 해당 타겟의 아래에 아이템을 추가.
                    // 'baseline'은 최상단에 숨겨놓은 엘리먼트.
                    // 뷰 페이지가 빈 상태이면 이 것을 기준으로 아이템을 append 한다.
                    var target = this.baseline;
                    var component = DEF_VIEW_ITEM[data.type];
                    var nextIndex = 0;
                    // 이미 뷰에 존재한다면
                    if (this._alreadyDisplayd(data.id)) {
                        console.log("alreayDisplayed");
                        if (complete) {
                            complete.apply(null, []);
                        }
                        return false;
                    }
                    if (data.index) {
                        var tempRef = this.viewComponents.elementAtIndex(data.index - 1);
                        if (tempRef) {
                            target = tempRef.instance;
                        }
                    }
                    console.log(target);
                    this._dcl.loadNextToLocation(component, target.elementRef).then(function (ref) {
                        var item = ref.instance;
                        item.viewid = data.id;
                        item.import(data);
                        // 중간에 아이템이 추가되면 인덱스 번호 재정렬
                        // if (headIndex) {
                        //     this._sortIndex(this.items);
                        // }
                        item.syncIDB();
                        _this.viewComponents.add(ref);
                        if (complete) {
                            complete.apply(null, [ref]);
                        }
                    });
                    return true;
                };
                View.prototype.removeItem = function (itemID) {
                    var componentRef = this._getItemByID(itemID);
                    if (itemID) {
                        componentRef.dispose();
                        this.viewComponents.remove(componentRef);
                    }
                    else {
                        this.viewComponents.forEach(function (ref) {
                            ref.dispose();
                        });
                        this.viewComponents.clear();
                    }
                };
                View.prototype.newID = function () {
                    var base = new Date('2015-09-04 00:00:00').getTime();
                    var current = config_1.Config.now();
                    return this.recipe.id + '-i' + (current - base);
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
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, recipe_1.RecipeService])
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
