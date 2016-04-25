System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventManager;
    return {
        setters:[],
        execute: function() {
            EventManager = (function () {
                function EventManager() {
                    this._events = {};
                    this._expires = {};
                }
                // event:string - 이벤트 이름
                // callback:function - 이벤트 발생 시 호출할 핸들러
                // expires:number - 몇 번 호출되고 제거 되는가?
                EventManager.prototype.addEvent = function (event, callback, expires) {
                    if (expires === void 0) { expires = 999999999; }
                    if (this._events[event] instanceof Array) {
                        this._events[event].push(callback);
                    }
                    else {
                        this._events[event] = [callback];
                    }
                    this.eventExpires(event, expires);
                };
                // event:string - 삭제할 이벤트 이름
                EventManager.prototype.removeEvent = function (event) {
                    delete this._events[event];
                    delete this._expires[event];
                };
                // event:string - 이벤트 이름
                // data:array - 이벤트 인자
                EventManager.prototype.fireEvent = function (event, data, context) {
                    if (typeof this._events[event] === "undefined") {
                        return false;
                    }
                    if (this._expires[event] <= 0) {
                        this.removeEvent(event);
                        return false;
                    }
                    context = context || this;
                    this._expires[event] -= 1;
                    this._events[event].forEach(function (callback, idx) {
                        if (Object.prototype.toString.call(data) === "[object Array]") {
                            callback.apply(context, data);
                        }
                        else {
                            callback.apply(context, [data]);
                        }
                    });
                };
                EventManager.prototype.eventExpires = function (event, expires) {
                    if (expires === void 0) { expires = 0; }
                    this._expires[event] = expires;
                };
                EventManager.prototype.clearEvent = function () {
                    this._events = {};
                };
                return EventManager;
            }());
            exports_1("EventManager", EventManager);
        }
    }
});
