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
import {RecipeService, Recipe, gRecipes, IRecipeItem} from '../../services/recipe';
import {Config} from '../../services/config';

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
    private _recipeID: string;
    private _recipe: Recipe;
    // private _elementRef: ElementRef;

    constructor(
        elementRef: ElementRef,
        private _dcl: DynamicComponentLoader,
        private _recipeService: RecipeService) {
        super(elementRef);
        // this._elementRef = elementRef;
    }

    ngAfterViewInit() {
        Util.extractViewChildren(this, [this.arrPopupMenu]);
    }

    public open(recipeID?: string) {
        if (recipeID) {
            this._recipeID = recipeID;
            this.loadItems();
        }
        this.active();
    }


    // IndexedDB로 부터 자식 아이템들을 모두 읽어 온다.
    public loadItems() {
        this.recipe = gRecipes[this.recipeID];
        // this._recipeService.downloadItems(this.recipeID);
        
        
        // this.storage.forEach( (data) => {
        //     
        // });
        // this.addItem(ViewEmptyMsg);
    }

    // 새 뷰-오브젝트 아이템을 추가.
    public addItem(type: string, data: any, targetIndex?: number) {
        var target: any = this.emptyMsg,
            component: any = DEF_VIEW_ITEM[type],
            nextIndex: number = 0;
        if (this.items.size() > 0) {
            if (targetIndex) {
                target = this.items.elementAtIndex(targetIndex);
            } else {
                target = this.items.last();
            }
            nextIndex = this.items.indexOf(target);
        }
        
        this._dcl.loadNextToLocation(component, target.elementRef).then(ref => {
            let item = ref.instance;
            item.import({
                id: this.newID(),
                index: nextIndex,
                type: type,
                parent: this.recipe.id,
                updated: Util.toUnixTimestamp(Config.now()),
                text: "My Header3"
            });
            this.items.add(item);
            
            // 중간에 아이템이 추가되면 인덱스 번호 재정렬
            if (targetIndex) {
                this._sortIndex(this.items);
            }
            
            item.syncIDB();
        });
    }
    
    public newID(): string {
        let base = new Date('2015-09-04 00:00:00').getTime();
        let current = Config.now();
        return this.recipe.id + '-i' + (current - base);
    }
    
    private _sortIndex(items: LinkedList<IRecipeItem>): LinkedList<IRecipeItem> {
        if (items) {
            let i = 0;
            items.forEach( (item) => {
                item.index = i++;
            });
        }
        return items;
    }
    
    get recipe(): Recipe {
        return this._recipe;
    }
    
    set recipe(r: Recipe) {
        this._recipe = r;
    }
    
    get recipeID(): string {
        return this._recipeID;
    }
    
    set recipeID(id: string) {
        this._recipeID = id;
    }
}

export const DEF_VIEW_ITEM = {
    'empty-msg': ViewEmptyMsg,
    'header': ViewHeader
};
