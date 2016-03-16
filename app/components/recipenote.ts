import {Component, ElementRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {Navigation} from './navigation/navigation';
import {Sidebar} from './sidebar/sidebar';

@Component({
    selector: 'app',
    // templateUrl: 'recipenote.html',
    templateUrl: 'components/recipenote.html',
    styleUrls: ['components/recipenote.css'],
    directives: [
        ROUTER_DIRECTIVES,
        Navigation,
        Sidebar
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})

// @RouteConfig([
// ])

export class Recipenote {
    element: Element;
    title: 'rnote'

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    showCloseArea(): void {
        this.element.querySelector('.sidebar-close').setAttribute('active', 'on');
    }

    hideCloseArea(): void {
        this.element.querySelector('.sidebar-close').setAttribute('active', 'off');
    }
}
