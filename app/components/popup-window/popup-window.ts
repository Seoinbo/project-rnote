import {Directive, ElementRef} from 'angular2/core';
import {ViewObject} from '../../directives/view-object/view-object';
import {Button} from '../button/button';

declare var $: any;

@Directive({
    selector: 'popup-window'
})
export class PopupWindow extends ViewObject {
    private _bgActivation: boolean = false;
    private _boxActivation: boolean = false;

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    public open() {
        this.show();
        this._bgActivation = true;
        this._boxActivation = true;
    }

    public close() {
        this.hide();
        this._bgActivation = false;
        this._boxActivation = false;
    }
}
