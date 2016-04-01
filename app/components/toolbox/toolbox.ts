import {Directive, ElementRef, Input, Output, QueryList, ViewChildren} from 'angular2/core';
import {ViewObject} from '../../directives/view-object';

@Directive({
    selector: 'toolbox'
})
export class Toolbox extends ViewObject{

    constructor(_elementRef: ElementRef) {
        super(_elementRef);
    }

    ngAfterViewInit() {
    }
}
