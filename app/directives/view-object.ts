import {ElementRef, Input} from 'angular2/core';

export class ViewObject {
    @Input() id: string;
    protected _element: HTMLElement;
    private _activation: boolean = false;
    private _visibility: boolean = false;
    private _originDisplay: string;
    private _rendering: boolean = true;

    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;
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
        this._rendering = true;
    }

    public remove(): void {
        this._rendering = false;
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
            this._originDisplay = this._element.style.display || 'block';
        }
        if (this._rendering) {
            this._element.style.display = this._originDisplay;
        } else {
            this._element.style.display = 'none';
        }
    }
}
