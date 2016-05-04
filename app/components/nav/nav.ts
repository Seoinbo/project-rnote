import {Directive,
    ElementRef,
    HostListener,
    EventEmitter,
    Injectable,
    Input,
    Output,
    Query,
    QueryList,
    ViewChildren,
    Renderer
} from 'angular2/core';
import {Animate} from "../../directives/animate/animate";
import {String} from "../../services/util";

@Directive({
    selector: 'nav'
})
export class Nav {
    protected _element: HTMLElement;
    protected _animate: Animate;

    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    constructor(protected _elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
        this._animate = new Animate(this._elementRef);
    }

    ngAfterContentInit() {

    }

    ngAfterViewInit() {
        // this.initEvent();
    }

    onClick(e: any) {
        console.log('a:', e);
    }
}

@Directive({
    selector: 'title[nav]',
    host: {
        '(click)': 'toggleExpend();',
        '[attr.expend]': '_expend'
    }
})
export class NavTitle {
    protected _element: HTMLElement;
    private _text: string = 'TITLE';
    private _expend = false;
    protected _animate: Animate;

    constructor(private _elementRef: ElementRef) {
        this._element = this._elementRef.nativeElement;
        this._animate = new Animate(this._elementRef);
    }

    public renderText(): void {
        this._element.innerText = this._text;
    }

    public toggleExpend(): void {
        let width: number = this._element.offsetWidth;
        let textWidth: number = String.width(this._element);
        if (width >= textWidth) {
            return;
        }
        if (this._expend) {
            this.collapse();
        } else {
            this.expend();
        }
        this._animate.bounceIn('jelly');
    }

    public expend(): void {
        this._expend = true;
    }

    public collapse(): void {
        this._expend = false;
    }

    set text(value: string) {
        this._text = value;
        this.renderText();
    }

    get text(): string {
        return this._text;
    }
}
