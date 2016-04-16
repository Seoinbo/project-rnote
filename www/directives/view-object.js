System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ViewObject;
    return {
        setters:[],
        execute: function() {
            ViewObject = (function () {
                function ViewObject(elementRef) {
                    this._expired = false;
                    this._activation = false;
                    this._visibility = false;
                    this._rendering = true;
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
                    this._rendering = true;
                };
                ViewObject.prototype.remove = function () {
                    this._rendering = false;
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
                            this._originDisplay = this._element.style.display || 'block';
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
                Object.defineProperty(ViewObject.prototype, "vid", {
                    get: function () {
                        return this._vid;
                    },
                    set: function (value) {
                        this._element.setAttribute('vid', value);
                        this._vid = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ViewObject;
            }());
            exports_1("ViewObject", ViewObject);
        }
    }
});
