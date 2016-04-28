import {
    Component,
    Query,
    QueryList,
    ElementRef,
    ViewChild,
    ViewChildren,
    HostListener,
    EventEmitter,
    Output,
    DynamicComponentLoader,
    ComponentRef,
    Injector,
    NgZone
} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Platform} from '../services/platform';
import {Util, String, JSON2Array} from '../services/util';
import {UserAccount, User} from '../services/user-account';
import {List, ListItem} from './list/list';
import {View} from './view/view';
import {ViewHeader} from './view/header/header';
import {Sidebar} from './sidebar/sidebar';
import {Nav, NavTitle} from './nav/nav';
import {Panel} from './panel/panel';
import {Button} from './button/button';
import {PopupLabels} from './popup-window/popup-labels/popup-labels';
import {PopupMenu} from './popup-menu/popup-menu';
import {RecipeService, Recipe, gRecipes} from '../services/recipe';
import {LabelService, Label} from '../services/label';
import {PopupService} from '../services/popup';

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
        ListItem,
        View,
        ViewHeader,
        Sidebar,
        Button,
        PopupMenu
    ],
    providers: [
        ROUTER_PROVIDERS,
        RecipeService,
        LabelService,
        PopupService,
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
        private _labelService: LabelService,
        private _popupService: PopupService,
        private _userAccount: UserAccount,
        private _dcl: DynamicComponentLoader,
        private _injector: Injector,
        private _zone: NgZone
    ) {
        this._element = this._elementRef.nativeElement;
        // test-userAccount
        this._userAccount.user = {
            id: 'g1625346125341653'
        };
        this._labelService.userid = this._userAccount.user.id;
        this._recipeService.userid = this._userAccount.user.id;
        // register containerRef of popup-window.
        this._popupService.setViewContainer(this._elementRef);
    }

    ngOnInit() {
        this._labelService.downloadAll(() => {
            this._zone.run(function(){});
        });
        this._recipeService.downloadAll(() => {
            this._zone.run(function(){});
        });
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
    
    // 팝업 윈도우 열기.
    public openWindow(type: string) {
        // console.log(this._popupService);
        this._popupService.openLabel();
    }

    public addRecipe() {
        let newRecipe: Recipe = this._recipeService.create();
        this._recipeService.add(newRecipe);
        newRecipe.syncIDB();
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
