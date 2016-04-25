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
                    this._disabledEvents = {};
                }
                // event:string - 이벤트 이름
                // callback:function - 이벤트 발생 시 호출할 핸들러
                EventManager.prototype.addEvent = function (event, callback) {
                    if (this._events[event] instanceof Array) {
                        this._events[event].push(callback);
                    }
                    else {
                        this._events[event] = [callback];
                    }
                };
                // event:string - 삭제할 이벤트 이름
                EventManager.prototype.removeEvent = function (event) {
                    delete this._events[event];
                };
                // event:string - 이벤트 이름
                // data:array - 이벤트 인자
                EventManager.prototype.fireEvent = function (event, data, context) {
                    if (typeof this._events[event] === "undefined") {
                        return false;
                    }
                    if (typeof this._disabledEvents[event] !== "undefined" && this._disabledEvents[event] > 0) {
                        this._disabledEvents[event] -= 1;
                        return false;
                    }
                    context = context || this;
                    this._events[event].forEach(function (callback, idx) {
                        if (Object.prototype.toString.call(data) === "[object Array]") {
                            callback.apply(context, data);
                        }
                        else {
                            callback.apply(context, [data]);
                        }
                    });
                };
                EventManager.prototype.disableEvent = function (event, expires) {
                    if (expires === undefined) {
                        expires = 999999999;
                    }
                    this._disabledEvents[event] = +expires;
                };
                EventManager.prototype.enableEvent = function (event) {
                    this._disabledEvents[event] = 0;
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
