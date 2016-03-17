import {
    Component,
    Query,
    QueryList,
    ElementRef,
    ViewChild,
    HostListener,
    EventEmitter,
    Output
} from 'angular2/core';
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
    title: string = 'rnote';
    element: Element;

    sidebarActive: boolean = false;
    @Output() onChangeSidebarDisplay: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

        // @Query("side") items: QueryList<ElementRef>;
    }

    showCloseArea(): void {
        // this.element.querySelector('.sidebar-close').setAttribute('active', 'on');
    }

    hideCloseArea(): void {
        // this.element.querySelector('.sidebar-close').setAttribute('active', 'off');
    }

    showSidebar(): void {
        this.sidebarActive = true;
        this.onChangeSidebarDisplay.emit(true);
        console.log("show~", this.sidebarActive);
    }

    hideSidebar(): void {

        this.sidebarActive = false;
        this.onChangeSidebarDisplay.emit(false);
        console.log("hide~", this.sidebarActive);
    }

    toggleSidebar(): void {
        if (this.sidebarActive) {
            this.hideSidebar();
        } else {
            this.showSidebar();
        }
    }
}
