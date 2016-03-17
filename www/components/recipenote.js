System.register(['angular2/core', 'angular2/router', './navigation/navigation', './sidebar/sidebar'], function(exports_1, context_1) {
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
    var core_1, router_1, navigation_1, sidebar_1;
    var Recipenote;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            },
            function (sidebar_1_1) {
                sidebar_1 = sidebar_1_1;
            }],
        execute: function() {
            Recipenote = (function () {
                function Recipenote() {
                    this.title = 'rnote';
                    this.sidebarActive = false;
                    this.onChangeSidebarDisplay = new core_1.EventEmitter();
                }
                Recipenote.prototype.ngOnInit = function () {
                    // @Query("side") items: QueryList<ElementRef>;
                };
                Recipenote.prototype.showCloseArea = function () {
                    // this.element.querySelector('.sidebar-close').setAttribute('active', 'on');
                };
                Recipenote.prototype.hideCloseArea = function () {
                    // this.element.querySelector('.sidebar-close').setAttribute('active', 'off');
                };
                Recipenote.prototype.showSidebar = function () {
                    this.sidebarActive = true;
                    this.onChangeSidebarDisplay.emit(true);
                    console.log("show~", this.sidebarActive);
                };
                Recipenote.prototype.hideSidebar = function () {
                    this.sidebarActive = false;
                    this.onChangeSidebarDisplay.emit(false);
                    console.log("hide~", this.sidebarActive);
                };
                Recipenote.prototype.toggleSidebar = function () {
                    if (this.sidebarActive) {
                        this.hideSidebar();
                    }
                    else {
                        this.showSidebar();
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Recipenote.prototype, "onChangeSidebarDisplay", void 0);
                Recipenote = __decorate([
                    core_1.Component({
                        selector: 'app',
                        // templateUrl: 'recipenote.html',
                        templateUrl: 'components/recipenote.html',
                        styleUrls: ['components/recipenote.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            navigation_1.Navigation,
                            sidebar_1.Sidebar
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Recipenote);
                return Recipenote;
            }());
            exports_1("Recipenote", Recipenote);
        }
    }
});
