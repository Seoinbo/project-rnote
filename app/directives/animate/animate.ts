import {
    Directive,
    ElementRef,
    Pipe,
    PipeTransform,
    QueryList,
    HostListener
} from 'angular2/core';
import {Util} from '../../services/util';
import {Config} from '../../services/config';
import {EventManager} from '../../services/event-manager';

@Directive({
    selector: '[animate]',
    
})
export class Animate {
    protected _elementRef: ElementRef;
    protected _element: HTMLElement;
    protected _event: EventManager;
    protected _animateid: string;
    
    public static intervalTime = 25;
    
    @HostListener('transitionend', ['$event.target'])
    onTransitionEnd (target: any) {
        target.classList.forEach( (cls: string) => {
            if (cls.indexOf("-in") > -1) {
                this._event.fireEvent(this.animateid + "-in");
            }
            if (cls.indexOf("-out") > -1) {
                this._event.fireEvent(this.animateid + "-out");
            }
        });
    }

    public constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._element = elementRef.nativeElement;
        this._event = new EventManager();
        this.animateid = "ani" + Util.uniqID(Config.now()) + Math.round(Math.random() * 1000);
    }

    get elementRef(): ElementRef {
        return this._elementRef;
    }

    set elementRef(value: ElementRef) {
        this._elementRef = value;
    }

    get element(): HTMLElement {
        return this._element;
    }

    set element(value: HTMLElement) {
        this._element = value;
    }
    
    get animateid(): string {
        return this._animateid;
    }

    set animateid(id: string) {
        this._element.setAttribute('animateid', id);
        this._animateid = id;
    }
    
    public ready(type: string, complete?: Function) {
        this._element.classList.add(type);
        if (complete) {
            complete.apply(null, [this]);
        }
    }

    public in(type: string, complete?: Function) {
        this._element.classList.remove(type + '-out');
        this._element.classList.add(type + '-in');
        this._element.style.visibility = 'visible';
        this._event.addEvent(this.animateid + "-in", () => {
            if (complete) {
                complete.apply(null, [this]);
            }
        }, 1);
    }

    public out(type: string, complete?: Function) {
        this._element.classList.remove(type + '-in');
        this._element.classList.add(type + '-out');
        this._event.addEvent(this.animateid + "-out", () => {
            this._element.style.visibility = 'hidden';
            if (complete) {
                complete.apply(null, [this]);
            }
        }, 1);
    }
}

export class AniList {
    private _members: Array<Animate> = [];
    
    public constructor(list?: Array<any>, filter?: string) {
        this.import(list, filter);
    }
    
    public import(list: Array<any>, filter?: string) {
        this._members = [];
        if (filter) {
            list.forEach( (item: any) => {
                if (item.element.getAttribute('name') == filter) {
                    this._members.push(item);
                }
            });
        } else {
            this._members = list;
        }
    }
    
    public filter(name: string): AniList {
        let temp: Array<any> = [];
        this._members.forEach( (item: any) => {
            if (item.element.getAttribute('name') == name) {
                temp.push(item);
            }
        });
        this._members = temp;
        return this;
    }
    
    public streamReady(type: string, complete?: Function, interval?: number) {
        this._stream(type, 'ready', complete, interval);
    }
    
    public streamIn(type: string, complete?: Function, interval?: number) {
        this._stream(type, 'in', complete, interval);
    }
    
    public streamOut(type: string, complete?: Function, interval?: number) {
        this._stream(type, 'out', complete, interval);
    }
    
    private _stream(type: string, state: string, complete?: Function, interval?: number) {
        if (!interval) {
            interval = Animate.intervalTime;
        }
        let length: number = this._members.length;
        this._members.forEach( (member: Animate, i: number) => {
            window.setTimeout( () => {
                member[state].apply(member, [type]);
                Util.lazyApply(i, length, complete, [this._members]);
            }, Animate.intervalTime * i++);
        });
    }
}
