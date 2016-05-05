System.register(['angular2/core', '../../../services/platform', '../view-item'], function(exports_1, context_1) {
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
    var core_1, platform_1, view_item_1;
    var ViewHeader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (view_item_1_1) {
                view_item_1 = view_item_1_1;
            }],
        execute: function() {
            ViewHeader = (function (_super) {
                __extends(ViewHeader, _super);
                function ViewHeader(elementRef) {
                    _super.call(this, elementRef);
                    this.heading = 'Heading';
                    this.editing = true;
                }
                ViewHeader.prototype.enterEditMode = function () {
                    this.editing = true;
                };
                ViewHeader.prototype.exitEditMode = function () {
                    this.editing = false;
                };
                ViewHeader = __decorate([
                    core_1.Component({
                        selector: 'h1',
                        templateUrl: platform_1.Platform.prependBaseURL('components/view/header/header.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/view/view-item.css'),
                            platform_1.Platform.prependBaseURL('components/view/header/header.css')
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
