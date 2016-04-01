System.register(['angular2/core', '../../directives/view-object'], function(exports_1, context_1) {
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
    var core_1, view_object_1;
    var PopupMenu;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            }],
        execute: function() {
            PopupMenu = (function (_super) {
                __extends(PopupMenu, _super);
                function PopupMenu(elementRef) {
                    _super.call(this, elementRef);
                }
                PopupMenu.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    document.body.addEventListener('mousedown', function () {
                        _this.inactive();
                    });
                };
                PopupMenu.prototype.onTransitionEnd = function () {
                    // 에니메이션 끝난 후 엘리먼트 감추기
                    if (!this.activation) {
                        this.hide();
                    }
                };
                PopupMenu = __decorate([
                    core_1.Directive({
                        selector: 'popup-menu',
                        host: {
                            '(transitionend)': 'onTransitionEnd()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PopupMenu);
                return PopupMenu;
            }(view_object_1.ViewObject));
            exports_1("PopupMenu", PopupMenu);
        }
    }
});
