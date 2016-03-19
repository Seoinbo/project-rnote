import {Component, EventEmitter, Output, ElementRef} from 'angular2/core';
import {SidebarButton} from '../button/sidebar-button/sidebar-button';

@Component({
    selector: 'sidebar',
    templateUrl: 'components/sidebar/sidebar.html',
    styleUrls: ['components/sidebar/sidebar.css'],
    directives: [
        SidebarButton
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
