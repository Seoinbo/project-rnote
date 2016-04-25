import {Directive, ElementRef, Pipe, PipeTransform, Input} from 'angular2/core';

@Directive({
    selector: '.view-object',
})
export class ViewObject {
    protected _elementRef: ElementRef;
    protected _element: HTMLElement;
    protected _expired: boolean = false;
    protected _activation: boolean = false;
    protected _visibility: boolean = false;
    protected _originDisplay: string;
    protected _rendering: boolean = true;
    protected _viewid: string;

    @Input() id: string;
    public data: any;

    constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._element = elementRef.nativeElement;
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

    public active(): void {
        if (!this.visibility) {
            this.show();
        }
        this.activation = true;
    }

    public inactive(): void {
        this.activation = false;
    }

    public toggleActivation(): void {
        if (this.activation) {
            this.inactive();
        } else {
            this.active();
        }
    }

    /*
     * css visibility func.
     */
    get activation(): boolean {
        return this._activation;
    }

    set activation(value: boolean) {
        this._activation = value;
        this._element.setAttribute('active', this._activation.toString());
    }

    public show(): void {
        this.visibility = true;
    }

    public hide(): void {
        this.visibility = false;
    }

    public toggleVisibility(): void {
        if (this.visibility) {
            this.hide();
        } else {
            this.show();
        }
    }

    get visibility(): boolean {
        return this._visibility;
    }

    set visibility(value: boolean) {
        this._visibility = value;
        if (this._visibility) {
            this._element.style.visibility = 'visible';
        } else {
            this._element.style.visibility = 'hidden';
        }
    }

    /*
     * css display func.
     */
    public render(): void {
        this.rendering = true;
    }

    public remove(): void {
        this.rendering = false;
    }

    public toggleRendering(): void {
        if (this._rendering) {
            this.hide();
        } else {
            this.show();
        }
    }

    get rendering(): boolean {
        return this._rendering;
    }

    set rendering(value: boolean) {
        this._rendering = value;
        if (!this._originDisplay) {
            this._originDisplay = window.getComputedStyle(this._element).display || 'block';
        }
        if (this._rendering) {
            this._element.style.display = this._originDisplay;
        } else {
            this._element.style.display = 'none';
        }
    }

    get viewid(): string {
        return this._viewid;
    }

    set viewid(id: string) {
        this._element.setAttribute('viewid', id);
        this._viewid = id;
    }
}
