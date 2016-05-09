System.register(['angular2/core', '../../../services/platform', '../../../services/util', '../view-item', '../../button/button', '../../../directives/animate/animate'], function(exports_1, context_1) {
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
    var core_1, platform_1, util_1, view_item_1, button_1, animate_1;
    var ViewHeader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (view_item_1_1) {
                view_item_1 = view_item_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            }],
        execute: function() {
            ViewHeader = (function (_super) {
                __extends(ViewHeader, _super);
                function ViewHeader(elementRef) {
                    _super.call(this, elementRef);
                    this.heading = 'Heading';
                }
                ViewHeader.prototype.ngAfterViewInit = function () {
                    this.initDefault();
                    util_1.Util.extractViewChildren(this, [
                        this.arrButton
                    ]);
                    util_1.Util.extractViewChildren(this, [this.arrAnimate], 'Ani');
                    this._headerMoveButton.visibility = false;
                    this._headerTrashButton.visibility = false;
                };
                ViewHeader.prototype.initDefault = function () {
                    this.source = $.extend({
                        heading: "New Heading"
                    }, this.source);
                };
                ViewHeader.prototype.enterEditMode = function () {
                    this.editing = true;
                    this._headerMoveButton.show();
                    this._headerTrashButton.show();
                };
                ViewHeader.prototype.exitEditMode = function () {
                    this.editing = false;
                    this._headerMoveButton.hide();
                    this._headerTrashButton.hide();
                    this.touch().syncIDB();
                };
                ViewHeader.prototype.trash = function () {
                    var _this = this;
                    this.remove();
                    this.touch().syncIDB();
                    window.setTimeout(function () {
                        _this.cref.dispose();
                    }, 0);
                };
                __decorate([
                    core_1.ViewChildren(button_1.Button), 
                    __metadata('design:type', core_1.QueryList)
                ], ViewHeader.prototype, "arrButton", void 0);
                __decorate([
                    core_1.ViewChildren(animate_1.Animate), 
                    __metadata('design:type', core_1.QueryList)
                ], ViewHeader.prototype, "arrAnimate", void 0);
                ViewHeader = __decorate([
                    core_1.Component({
                        selector: 'h1',
                        templateUrl: platform_1.Platform.prependBaseURL('components/view/header/header.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/view/view-item.css'),
                            platform_1.Platform.prependBaseURL('components/view/header/header.css'),
                            platform_1.Platform.prependBaseURL('directives/animate/animate.css')
                        ],
                        directives: [
                            animate_1.Animate,
                            button_1.Button
                        ],
                        host: {
                            "[attr.editing]": "editing"
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ViewHeader);
                return ViewHeader;
            }(view_item_1.ViewItem));
            exports_1("ViewHeader", ViewHeader);
        }
    }
});
