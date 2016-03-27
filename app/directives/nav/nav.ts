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
    selector: 'nav title'
})

export class NavTitle {
    protected _text: string = 'TITLE';
    protected _element: HTMLElement;

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }

    renderText():void {
        this._element.innerText = this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get text():string {
        return this._text;
    }
}
