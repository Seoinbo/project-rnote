import {Directive, ElementRef, HostListener, EventEmitter, Injectable, Input, Output, Query, QueryList, ViewChildren, Renderer} from 'angular2/core';
import {DOM} from "angular2/src/platform/dom/dom_adapter";

@Directive({
    selector: 'nav'
})
export class Nav {
    protected _element: HTMLElement;

    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    constructor(protected _elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }

    ngAfterContentInit() {

    }

    ngAfterViewInit() {
        // this.initEvent();
    }

    // initEvent(): void {
    //     this._navButtons.toArray().forEach(button => {
    //         button.btnClick.subscribe( () => {
    //             console.log(e);
    //         })
    //         // this.btnClick.emit(['$event']);
    //     })
    // }

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

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }

    public renderText(): void {
        this._element.innerText = this._text;
    }
    
    public toggleExpend(): void {
        if (this._expend) {
            this.collapse();
        } else {
            this.expend();
        }
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
