import {Component, EventEmitter, Output, ElementRef} from 'angular2/core';
import {Platform} from '../../services/platform';
import {Button} from '../button/button';

@Component({
    selector: 'sidebar',
    templateUrl: Platform.prependBaseURL('components/sidebar/sidebar.html'),
    styleUrls: [Platform.prependBaseURL('components/sidebar/sidebar.css')],
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
