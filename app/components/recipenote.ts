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
import {List} from './list/list';
import {View} from './view/view';
import {Sidebar} from './sidebar/sidebar';
import {Nav, NavTitle} from './nav/nav';
import {Panel} from './panel/panel';
import {NavButton} from './button/nav-button/nav-button';

@Component({
    selector: 'app',
    templateUrl: 'components/recipenote.html',
    styleUrls: [
        'components/recipenote.css',
        'directives/nav/nav.css',
        'directives/panel/panel.css'
    ],
    directives: [
        ROUTER_DIRECTIVES,
        Nav,
        NavTitle,
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
    @ViewChild(NavTitle) navTitle: NavTitle;
    // title: string = 'aaa';
    protected _element: HTMLElement;
    private _sidebarActive: boolean = false;

    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;


    }

    ngOnInit() {


    }
    ngAfterViewInit() {
        this.navTitle.renderText();
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
