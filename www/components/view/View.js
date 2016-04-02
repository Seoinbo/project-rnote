System.register(['angular2/core', '../../directives/view-object', './header/header'], function(exports_1, context_1) {
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
    var core_1, view_object_1, header_1;
    var View;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (view_object_1_1) {
                view_object_1 = view_object_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            }],
        execute: function() {
            View = (function (_super) {
                __extends(View, _super);
                function View(elementRef) {
                    _super.call(this, elementRef);
                    this.items = [];
                    this.active();
                }
                View.prototype.addViewItem = function (type) {
                    this.items.push(header_1.ViewHeader);
                    console.log('addItem', this.items);
                };
                View = __decorate([
                    core_1.Directive({
                        selector: 'view'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], View);
                return View;
            }(view_object_1.ViewObject));
            exports_1("View", View);
        }
    }
});
