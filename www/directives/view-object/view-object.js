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
    var ViewObject;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ViewObject = (function () {
                function ViewObject(elementRef) {
                    this._expired = false;
                    this._activation = false;
                    this._visibility = false;
                    this._rendering = true;
                    this._editing = false;
                    this._elementRef = elementRef;
                    this._element = elementRef.nativeElement;
                }
                Object.defineProperty(ViewObject.prototype, "elementRef", {
                    get: function () {
                        return this._elementRef;
                    },
                    set: function (value) {
                        this._elementRef = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewObject.prototype, "element", {
                    get: function () {
                        return this._element;
                    },
                    set: function (value) {
                        this._element = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewObject.prototype.active = function () {
                    if (!this.visibility) {
                        this.show();
                    }
                    this.activation = true;
                };
                ViewObject.prototype.inactive = function () {
                    this.activation = false;
                };
                ViewObject.prototype.toggleActivation = function () {
                    if (this.activation) {
                        this.inactive();
                    }
                    else {
                        this.active();
                    }
                };
                Object.defineProperty(ViewObject.prototype, "editing", {
                    get: function () {
                        return this._editing;
                    },
                    set: function (value) {
                        this._editing = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewObject.prototype, "activation", {
                    /*
                     * css visibility func.
                     */
                    get: function () {
                        return this._activation;
                    },
                    set: function (value) {
                        this._activation = value;
                        this._element.setAttribute('active', this._activation.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewObject.prototype.show = function () {
                    this.visibility = true;
                };
                ViewObject.prototype.hide = function () {
                    this.visibility = false;
                };
                ViewObject.prototype.toggleVisibility = function () {
                    if (this.visibility) {
                        this.hide();
                    }
                    else {
                        this.show();
                    }
                };
                Object.defineProperty(ViewObject.prototype, "visibility", {
                    get: function () {
                        return this._visibility;
                    },
                    set: function (value) {
                        this._visibility = value;
                        if (this._visibility) {
                            this._element.style.visibility = 'visible';
                        }
                        else {
                            this._element.style.visibility = 'hidden';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /*
                 * css display func.
                 */
                ViewObject.prototype.render = function () {
                    this.rendering = true;
                };
                ViewObject.prototype.remove = function () {
                    this.rendering = false;
                };
                ViewObject.prototype.toggleRendering = function () {
                    if (this._rendering) {
                        this.hide();
                    }
                    else {
                        this.show();
                    }
                };
                Object.defineProperty(ViewObject.prototype, "rendering", {
                    get: function () {
                        return this._rendering;
                    },
                    set: function (value) {
                        this._rendering = value;
                        if (!this._originDisplay) {
                            this._originDisplay = window.getComputedStyle(this._element).display || 'block';
                        }
                        if (this._rendering) {
                            this._element.style.display = this._originDisplay;
                        }
                        else {
                            this._element.style.display = 'none';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewObject.prototype, "viewid", {
                    get: function () {
                        return this._viewid;
                    },
                    set: function (id) {
                        this._element.setAttribute('viewid', id);
                        this._viewid = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ViewObject.prototype, "id", void 0);
                ViewObject = __decorate([
                    core_1.Directive({
                        selector: ".view-object"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ViewObject);
                return ViewObject;
            }());
            exports_1("ViewObject", ViewObject);
        }
    }
});
