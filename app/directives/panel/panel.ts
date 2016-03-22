import {Directive, ElementRef, HostListener, EventEmitter, Input, Output} from 'angular2/core';

@Directive({
  selector: 'panel'
})

export class Panel {
    protected _element: HTMLElement;

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
}
