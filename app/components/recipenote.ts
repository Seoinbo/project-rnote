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
import {Platform} from '../services/platform';
import {List, RecipeItem} from './list/list';
import {View} from './view/view';
import {Sidebar} from './sidebar/sidebar';
import {Nav, NavTitle} from './nav/nav';
import {Panel} from './panel/panel';
import {Button} from './button/button';
import {RecipeService, Recipe} from '../services/recipe';

@Component({
    selector: 'app',
    templateUrl: Platform.prependBaseURL('components/recipenote.html'),
    styleUrls: [
        Platform.prependBaseURL('components/recipenote.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css'),
        Platform.prependBaseURL('components/view/view.css'),
        Platform.prependBaseURL('components/list/list.css')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        Nav,
        NavTitle,
        Panel,
        List,
        RecipeItem,
        View,
        Sidebar,
        Button
    ],
    providers: [
        ROUTER_PROVIDERS,
        RecipeService
    ]
})

// @RouteConfig([
//     path: '/menu',
//     name: ''
// ])

export class Recipenote {
    @Output() onChangeSidebarDisplay: EventEmitter<any> = new EventEmitter();
    @ViewChild(NavTitle) navTitle: NavTitle;
    @ViewChild(View) view: View;
    
    protected _element: HTMLElement;
    private _sidebarActive: boolean = false;
    public recipes: Recipe[] = [
        {id: 0, name: 'itemA'},
        {id: 0, name: 'itemB'}
    ];

    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;
    }

    ngOnInit() {


    }
    ngAfterViewInit() {
        this.navTitle.text = 'test';
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
