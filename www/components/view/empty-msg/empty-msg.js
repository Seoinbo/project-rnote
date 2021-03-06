System.register(['angular2/core', '../../../services/platform', '../../../directives/view-object/view-object'], function(exports_1, context_1) {
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
    var core_1, platform_1, view_object_1;
    var ViewEmptyMsg;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            }],
        execute: function() {
            ViewEmptyMsg = (function (_super) {
                __extends(ViewEmptyMsg, _super);
                function ViewEmptyMsg(elementRef) {
                    _super.call(this, elementRef);
                    this.type = 'view-empty-msg';
                }
                ViewEmptyMsg.prototype.ngOnInit = function () {
                };
                ViewEmptyMsg = __decorate([
                    core_1.Component({
                        selector: 'p[view-empty-msg]',
                        templateUrl: platform_1.Platform.prependBaseURL('components/view/empty-msg/empty-msg.html'),
                        styleUrls: [
                            platform_1.Platform.prependBaseURL('components/view/empty-msg/empty-msg.css')
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ViewEmptyMsg);
                return ViewEmptyMsg;
            }(view_object_1.ViewObject));
            exports_1("ViewEmptyMsg", ViewEmptyMsg);
        }
    }
});
