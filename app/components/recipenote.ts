import {
    Component,
    Query,
    QueryList,
    ElementRef,
    ViewChild,
    ViewChildren,
    HostListener,
    EventEmitter,
    Output
} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Platform} from '../services/platform';
import {Util, String, JSON2Array} from '../services/util';
import {UserAccount, User} from '../services/user-account';
import {List, RecipeItem} from './list/list';
import {View} from './view/view';
import {ViewHeader} from './view/header/header';
import {Sidebar} from './sidebar/sidebar';
import {Nav, NavTitle} from './nav/nav';
import {Panel} from './panel/panel';
import {Button} from './button/button';
import {PopupMenu} from './popup-menu/popup-menu';
import {RecipeService, gRecipes} from '../services/recipe';

@Component({
    selector: 'app',
    templateUrl: Platform.prependBaseURL('components/recipenote.html'),
    styleUrls: [
        Platform.prependBaseURL('components/recipenote.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css'),
        Platform.prependBaseURL('components/list/list.css'),
        Platform.prependBaseURL('components/popup-menu/popup-menu.css')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        Nav,
        NavTitle,
        Panel,
        List,
        RecipeItem,
        View,
        ViewHeader,
        Sidebar,
        Button,
        PopupMenu
    ],
    providers: [
        ROUTER_PROVIDERS,
        RecipeService,
        UserAccount
    ],
    pipes: [
        JSON2Array
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
    @ViewChildren(PopupMenu) arrPopupMenu: QueryList<PopupMenu>;

    protected _element: HTMLElement;
    private _sidebarActive: boolean = false;
    private _recipes = gRecipes;
    
    constructor(
        private _elementRef: ElementRef, 
        private _recipeService: RecipeService,
        private _userAccount: UserAccount
    ) {
        this._element = this._elementRef.nativeElement;
        // test-userAccount
        this._userAccount.user = {
            id: 'g1625346125341653'
        };
        this._recipeService.userid = this._userAccount.user.id;
    }

    ngOnInit() {

    }
    
    ngAfterViewInit() {
        this.navTitle.text = 'test';
        Util.extractViewChildren(this, [this.arrPopupMenu]);
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
    
    public addRecipe() {
        this._recipeService.create();
        console.log(this._recipes);
    }

    set sidebarActive(value: boolean) {
        this._sidebarActive = value;
    }

    get sidebarActive():boolean {
        return this._sidebarActive;
    }
    
    set recipes(value: any) {
        this._recipes = value;
    }

    get recipes():any {
        return this._recipes;
    }
}
