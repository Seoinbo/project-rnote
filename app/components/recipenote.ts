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
import {List} from './list/list';
import {View} from './view/view';
import {Sidebar} from './sidebar/sidebar';
import {NavButton} from './button/nav-button/nav-button';
import {Panel} from '../directives/panel/panel';

@Component({
    selector: 'app',
    // templateUrl: 'recipenote.html',
    templateUrl: 'components/recipenote.html',
    styleUrls: ['components/recipenote.css'],
    directives: [
        ROUTER_DIRECTIVES,
        Navigation,
        Panel,
        List,
        View,
        Sidebar,
        NavButton
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})

// @RouteConfig([
// ])

export class Recipenote {
    @Output() onChangeSidebarDisplay: EventEmitter<any> = new EventEmitter();

    protected _element: HTMLElement;
    private _sidebarActive: boolean = false;

    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;
    }

    ngOnInit() {
    }

    showSidebar(): void {
        this.sidebarActive = true;
        this.onChangeSidebarDisplay.emit(true);
    }

    hideSidebar(): void {
        this.sidebarActive = false;
        this.onChangeSidebarDisplay.emit(false);
    }

    toggleSidebar(): void {
        if (this.sidebarActive) {
            this.hideSidebar();
        } else {
            this.showSidebar();

        }
    }

    set sidebarActive(value: boolean) {
        this._sidebarActive = value;
    }

    get sidebarActive():boolean {
        return this._sidebarActive;
    }
}
