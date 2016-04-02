import {Directive, ElementRef} from 'angular2/core';
import {ViewObject} from '../../directives/view-object';
import {ViewHeader} from './header/header';

@Directive({
    selector: 'view'
})

export class View extends ViewObject {
    private items: any[] = [];

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.active();
    }

    addViewItem(type: string) {
        this.items.push(ViewHeader);
        console.log('addItem', this.items);
    }
}
