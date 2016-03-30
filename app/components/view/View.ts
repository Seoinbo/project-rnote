import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: 'view',
    host: {
        '[attr.active]': 'active'
    }
})

export class View {
    protected _element: HTMLElement;
    protected _active: boolean = true;

    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;
    }
    
    public show(): void {
        this._active = true;
    }
    
    public hide(): void {
        this._active = false;
    }
    
    get active(): boolean {
        return this._active;
    }
    set active(value: boolean) {
        this._active = value;
    }
}
