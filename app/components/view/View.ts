import {
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    DynamicComponentLoader
} from 'angular2/core';

import {Util, String} from '../../services/util';
import {Platform} from '../../services/platform';
import {LinkedList, ILinkedListNode} from '../../services/collections/LinkedList';
import {RecipeService, Recipe, gRecipes} from '../../services/recipe';

import {ViewObject} from '../../directives/view-object';
import {ViewHeader} from './header/header';
import {ViewEmptyMsg} from './empty-msg/empty-msg';

import {Nav, NavTitle} from '../nav/nav';
import {Panel} from '../panel/panel';
import {Button} from '../button/button';
import {PopupMenu} from '../popup-menu/popup-menu';



@Component({
    selector: 'view',
    templateUrl: Platform.prependBaseURL('components/view/view.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/view.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css'),
        Platform.prependBaseURL('components/popup-menu/popup-menu.css')
    ],
    directives: [
        ViewHeader,
        ViewEmptyMsg,
        Nav,
        NavTitle,
        Panel,
        Button,
        PopupMenu
    ]
})

export class View extends ViewObject {
    @ViewChild(ViewEmptyMsg) emptyMsg: ViewEmptyMsg;
    @ViewChildren(PopupMenu) arrPopupMenu: QueryList<PopupMenu>;

    public items = new LinkedList<any>();
    private _recipe: Recipe;
    
    storage = [
        {
            type: 'header',
            text: 'hello header'
        }
    ];

    constructor(elementRef: ElementRef, private _dcl: DynamicComponentLoader) {
        super(elementRef);
    }

    ngAfterViewInit() {
        Util.extractViewChildren(this, [this.arrPopupMenu]);
    }

    public open(recipeid?: string) {
        if (recipeid) {
            this.loadItems(recipeid);
        }
        this.active();
    }
    
    public loadItems(recipeid: string) {
        this.recipe = gRecipes[recipeid];
        // this.storage.forEach( (data) => {
        //     
        // });
        // this.addViewItem(ViewEmptyMsg);
    }

    public addViewItem(type: string, data: any, index?: number) {
        var target: any = this.emptyMsg,
            component: any = DEF_VIEW_ITEM[type];
        if (this.items.size() > 0) {
            if (index) {
                target = this.items.elementAtIndex(index);
            } else {
                target = this.items.last();
            }
        }
        this._dcl.loadNextToLocation(component, target.elementRef).then(ref => {
            ref.instance.text = "My Header2";
            console.log(ref.instance);
            
            this.items.add(ref.instance);
        });
    }
    
    get recipe(): Recipe {
        return this._recipe;
    }
    
    set recipe(r: Recipe) {
        this._recipe = r;
    }
}

export const DEF_VIEW_ITEM = {
    'empty-msg': ViewEmptyMsg,
    'header': ViewHeader
};
