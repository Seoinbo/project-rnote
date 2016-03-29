import {Component, EventEmitter, Output, ElementRef} from 'angular2/core';
import {Button} from '../button/button';

@Component({
    selector: 'sidebar',
    templateUrl: 'components/sidebar/sidebar.html',
    styleUrls: ['components/sidebar/sidebar.css'],
    directives: [
        Button
    ]
})

export class Sidebar {
    @Output() sidebarClose: EventEmitter<any> = new EventEmitter();

    protected element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    hide() {
        this.sidebarClose.emit(null);
    }

}
