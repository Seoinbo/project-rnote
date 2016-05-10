System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var SlipSortable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SlipSortable = (function () {
                function SlipSortable(elementRef) {
                    this.reorder = new core_1.EventEmitter();
                    this.beforewait = new core_1.EventEmitter();
                    this._elementRef = elementRef;
                    this._element = elementRef.nativeElement;
                }
                SlipSortable.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    // init Slip libaray.
                    this._slip = new Slip(this._element);
                    this._element.addEventListener('slip:beforeswipe', function (e) {
                        e.preventDefault();
                    }, false);
                    this._element.addEventListener('slip:beforewait', function (e) {
                        if (e.target.className.indexOf('mover') > -1
                            || e.target.parentNode.className.indexOf('mover') > -1) {
                            _this.beforewait.next(e);
                            e.preventDefault();
                        }
                    }, false);
                    // this._element.addEventListener('slip:beforereorder', (e: any) => {
                    //     if (/demo-no-reorder/.test(e.target.className)) {
                    //         e.preventDefault();
                    //     }
                    // }, false);
                    this._element.addEventListener('slip:reorder', function (e) {
                        _this.reorder.next(e);
                    }, false);
                };
                Object.defineProperty(SlipSortable.prototype, "slip", {
                    get: function () {
                        return this._slip;
                    },
                    set: function (instance) {
                        this._slip = instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SlipSortable.prototype, "reorder", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SlipSortable.prototype, "beforewait", void 0);
                SlipSortable = __decorate([
                    core_1.Directive({
                        selector: '[slip]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], SlipSortable);
                return SlipSortable;
            }());
            exports_1("SlipSortable", SlipSortable);
        }
    }
});
