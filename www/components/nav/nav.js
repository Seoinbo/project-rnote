System.register(['angular2/core', "../../directives/animate/animate", "../../services/util"], function(exports_1, context_1) {
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
    var core_1, animate_1, util_1;
    var Nav, NavTitle;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            Nav = (function () {
                function Nav(_elementRef) {
                    this._elementRef = _elementRef;
                    this.btnClick = new core_1.EventEmitter();
                    this._element = _elementRef.nativeElement;
                    this._animate = new animate_1.Animate(this._elementRef);
                }
                Nav.prototype.ngAfterContentInit = function () {
                };
                Nav.prototype.ngAfterViewInit = function () {
                    // this.initEvent();
                };
                Nav.prototype.onClick = function (e) {
                    console.log('a:', e);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Nav.prototype, "btnClick", void 0);
                Nav = __decorate([
                    core_1.Directive({
                        selector: 'nav'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Nav);
                return Nav;
            }());
            exports_1("Nav", Nav);
            NavTitle = (function () {
                function NavTitle(_elementRef) {
                    this._elementRef = _elementRef;
                    this._text = 'TITLE';
                    this._expend = false;
                    this._element = this._elementRef.nativeElement;
                    this._animate = new animate_1.Animate(this._elementRef);
                }
                NavTitle.prototype.renderText = function () {
                    this._element.innerText = this._text;
                };
                NavTitle.prototype.toggleExpend = function () {
                    var width = this._element.offsetWidth;
                    var textWidth = util_1.String.width(this._element);
                    if (width >= textWidth) {
                        return;
                    }
                    if (this._expend) {
                        this.collapse();
                    }
                    else {
                        this.expend();
                    }
                    this._animate.bounceIn('jelly');
                };
                NavTitle.prototype.expend = function () {
                    this._expend = true;
                };
                NavTitle.prototype.collapse = function () {
                    this._expend = false;
                };
                Object.defineProperty(NavTitle.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        this._text = value;
                        this.renderText();
                    },
                    enumerable: true,
                    configurable: true
                });
                NavTitle = __decorate([
                    core_1.Directive({
                        selector: 'title[nav]',
                        host: {
                            '(click)': 'toggleExpend();',
                            '[attr.expend]': '_expend'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NavTitle);
                return NavTitle;
            }());
            exports_1("NavTitle", NavTitle);
        }
    }
});
