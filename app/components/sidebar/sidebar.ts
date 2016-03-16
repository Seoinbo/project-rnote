import {Component, ElementRef} from 'angular2/core';
import {Recipenote} from '../recipenote';

export class Sidebar {
    element: Element;
    // recipenote: Recipenote;
    
    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
        // this.recipenote = new Recipenote();
    }
    
    show(): void {
        document.querySelector('sidebar').setAttribute('active', 'on');
        // this.recipenote.showCloseArea();
    }
    
    hide(): void {
        document.querySelector('sidebar').setAttribute('active', 'off');
    }
    
    toggle(): void {
        let elSidebar: Element = document.querySelector('sidebar');
        if (elSidebar.getAttribute('active') == 'off') {
            this.show();
        } else {
            this.hide();
        }
    }
}
