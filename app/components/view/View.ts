import {Directive, ElementRef} from 'angular2/core';
import {ViewObject} from '../../directives/view-object';

@Directive({
    selector: 'view'
})

export class View extends ViewObject {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
