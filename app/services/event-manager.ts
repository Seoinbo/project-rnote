export class EventManager {
    private _events: {} = {};
    private _expires: {} = {};
    
    public constructor() {
        
    }
    
    // event:string - 이벤트 이름
    // callback:function - 이벤트 발생 시 호출할 핸들러
    // expires:number - 몇 번 호출되고 제거 되는가?
    public addEvent(event: string, callback: Function, expires: number = 999999999) {
        if (this._events[event] instanceof Array) {
            this._events[event].push(callback);
        } else {
            this._events[event] = [callback];
        }
        this.eventExpires(event, expires);
    }
    
    // event:string - 삭제할 이벤트 이름
    public removeEvent(event: string) {
        delete this._events[event];
        delete this._expires[event];
    }
    
    // event:string - 이벤트 이름
    // data:array - 이벤트 인자
    public fireEvent(event: string, data?: any, context?: any): boolean {
        if (typeof this._events[event] === "undefined") {
            return false;
        }
        if (this._expires[event] <= 0) {
            this.removeEvent(event);
            return false;
        }
        context = context || this;
        this._expires[event] -= 1;
        
        this._events[event].forEach( (callback: Function, idx: number) => {
            if (Object.prototype.toString.call(data) === "[object Array]") {
                callback.apply(context, data);
            } else {
                callback.apply(context, [data]);
            }
        });
    }
    
    public eventExpires(event: string, expires: number = 0) {
        this._expires[event] = expires;
    }
    
    public clearEvent() {
        this._events = {};
    }
}
