System.register(['angular2/core', '../button/sidebar-button/sidebar-button'], function(exports_1, context_1) {
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
    var core_1, sidebar_button_1;
    var Sidebar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sidebar_button_1_1) {
                sidebar_button_1 = sidebar_button_1_1;
            }],
        execute: function() {
            Sidebar = (function () {
                function Sidebar(elementRef) {
                    this.sidebarClose = new core_1.EventEmitter();
                    this.element = elementRef.nativeElement;
                }
                Sidebar.prototype.hide = function () {
                    this.sidebarClose.emit(null);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Sidebar.prototype, "sidebarClose", void 0);
                Sidebar = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        templateUrl: 'components/sidebar/sidebar.html',
                        styleUrls: ['components/sidebar/sidebar.css'],
                        directives: [
                            sidebar_button_1.SidebarButton
                        ]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Sidebar);
                return Sidebar;
            }());
            exports_1("Sidebar", Sidebar);
        }
    }
});
