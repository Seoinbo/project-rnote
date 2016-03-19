System.register(['angular2/core', '../navigation/navigation'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, navigation_1;
    var View;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            }],
        execute: function() {
            View = (function () {
                function View(elementRef) {
                    this.element = elementRef.nativeElement;
                }
                View = __decorate([
                    core_1.Component({
                        selector: 'view',
                        templateUrl: 'components/view/view.html',
                        styleUrls: ['components/view/view.css'],
                        directives: [
                            navigation_1.Navigation
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], View);
                return View;
            }());
            exports_1("View", View);
        }
    }
});
