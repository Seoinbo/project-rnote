System.register(['angular2/core', '../button/nav-button/nav-button', './title/title', '../../directives/panel/panel'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, nav_button_1, title_1, panel_1;
    var Navigation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_button_1_1) {
                nav_button_1 = nav_button_1_1;
            },
            function (title_1_1) {
                title_1 = title_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            }],
        execute: function() {
            Navigation = (function () {
                function Navigation(_elementRef, _renderer, _conPanels) {
                    this._elementRef = _elementRef;
                    this._renderer = _renderer;
                    this.title = "TITLE";
                    this.btnClick = new core_1.EventEmitter();
                    this._element = _elementRef.nativeElement;
                    this._conPanels = _conPanels;
                }
                Navigation.prototype.ngAfterContentInit = function () {
                    this._element.innerHTML = this._conPanels.first.element.outerHTML;
                    // this._element.appendChild(this._conPanel._results[0]);
                    console.log(this._conPanels);
                };
                Navigation.prototype.ngAfterViewInit = function () {
                    // this.initEvent();
                };
                // initEvent(): void {
                //     this._navButtons.toArray().forEach(button => {
                //         button.btnClick.subscribe( () => {
                //             console.log(e);
                //         })
                //         // this.btnClick.emit(['$event']);
                //     })
                // }
                Navigation.prototype.onClick = function (e) {
                    console.log('a:', e);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Navigation.prototype, "btnClick", void 0);
                __decorate([
                    core_1.ViewChildren(nav_button_1.NavButton), 
                    __metadata('design:type', core_1.QueryList)
                ], Navigation.prototype, "_navButtons", void 0);
                Navigation = __decorate([
                    core_1.Component({
                        selector: 'nav',
                        templateUrl: 'components/navigation/navigation.html',
                        styleUrls: ['components/navigation/navigation.css'],
                        directives: [
                            panel_1.Panel,
                            nav_button_1.NavButton,
                            title_1.Title
                        ]
                    }),
                    __param(2, core_1.Query(panel_1.Panel)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.QueryList])
                ], Navigation);
                return Navigation;
            }());
            exports_1("Navigation", Navigation);
        }
    }
});
//# sourceMappingURL=navigation.js.map