System.register(['angular2/core', '../../services/util', '../../services/config', '../../services/event-manager'], function(exports_1, context_1) {
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
    var core_1, util_1, config_1, event_manager_1;
    var Animate, AniList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            }],
        execute: function() {
            Animate = (function () {
                function Animate(elementRef) {
                    this._elementRef = elementRef;
                    this._element = elementRef.nativeElement;
                    this._event = new event_manager_1.EventManager();
                    this.animateid = "ani" + util_1.Util.uniqID(config_1.Config.now()) + Math.round(Math.random() * 1000);
                }
                Animate.prototype.onTransitionEnd = function (target) {
                    var _this = this;
                    target.classList.forEach(function (cls) {
                        if (cls.indexOf("-in") > -1) {
                            _this._event.fireEvent(_this.animateid + "-in");
                        }
                        if (cls.indexOf("-out") > -1) {
                            _this._event.fireEvent(_this.animateid + "-out");
                        }
                    });
                };
                Object.defineProperty(Animate.prototype, "elementRef", {
                    get: function () {
                        return this._elementRef;
                    },
                    set: function (value) {
                        this._elementRef = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Animate.prototype, "element", {
                    get: function () {
                        return this._element;
                    },
                    set: function (value) {
                        this._element = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Animate.prototype, "animateid", {
                    get: function () {
                        return this._animateid;
                    },
                    set: function (id) {
                        this._element.setAttribute('animateid', id);
                        this._animateid = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Animate.prototype.ready = function (type, complete) {
                    this._element.classList.add(type);
                    if (complete) {
                        complete.apply(null, [this]);
                    }
                };
                Animate.prototype.in = function (type, complete) {
                    var _this = this;
                    this._element.classList.remove(type + '-out');
                    this._element.classList.add(type + '-in');
                    if (complete) {
                        this._event.addEvent(this.animateid + "-in", function () {
                            complete.apply(null, [_this]);
                        }, 1);
                    }
                };
                Animate.prototype.out = function (type, complete) {
                    var _this = this;
                    this._element.classList.remove(type + '-in');
                    this._element.classList.add(type + '-out');
                    if (complete) {
                        this._event.addEvent(this.animateid + "-out", function () {
                            complete.apply(null, [_this]);
                        }, 1);
                    }
                };
                Animate.intervalTime = 20;
                __decorate([
                    core_1.HostListener('transitionend', ['$event.target']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Animate.prototype, "onTransitionEnd", null);
                Animate = __decorate([
                    core_1.Directive({
                        selector: '[animate]',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Animate);
                return Animate;
            }());
            exports_1("Animate", Animate);
            AniList = (function () {
                function AniList(list, filter) {
                    this._members = [];
                    this.import(list, filter);
                }
                AniList.prototype.import = function (list, filter) {
                    var _this = this;
                    this._members = [];
                    if (filter) {
                        list.forEach(function (item) {
                            if (item.element.getAttribute('name') == filter) {
                                _this._members.push(item);
                            }
                        });
                    }
                    else {
                        this._members = list;
                    }
                };
                AniList.prototype.filter = function (name) {
                    var temp = [];
                    this._members.forEach(function (item) {
                        if (item.element.getAttribute('name') == name) {
                            temp.push(item);
                        }
                    });
                    this._members = temp;
                    return this;
                };
                AniList.prototype.streamReady = function (type, complete, interval) {
                    this._stream(type, 'ready', complete, interval);
                };
                AniList.prototype.streamIn = function (type, complete, interval) {
                    this._stream(type, 'in', complete, interval);
                };
                AniList.prototype.streamOut = function (type, complete, interval) {
                    this._stream(type, 'out', complete, interval);
                };
                AniList.prototype._stream = function (type, state, complete, interval) {
                    var _this = this;
                    if (!interval) {
                        interval = Animate.intervalTime;
                    }
                    var length = this._members.length;
                    this._members.forEach(function (member, i) {
                        window.setTimeout(function () {
                            member[state].apply(member, [type]);
                            util_1.Util.lazyApply(i, length, complete, [_this._members]);
                        }, Animate.intervalTime * i++);
                    });
                };
                return AniList;
            }());
            exports_1("AniList", AniList);
        }
    }
});
