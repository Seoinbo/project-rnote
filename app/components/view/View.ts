import {
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    DynamicComponentLoader
} from 'angular2/core';

declare var $: any;

import {Util, String} from '../../services/util';
import {Platform} from '../../services/platform';
import {LinkedList, ILinkedListNode} from '../../services/collections/LinkedList';
import {RecipeService, Recipe, gRecipes, IRecipeItem} from '../../services/recipe';
import {Config} from '../../services/config';

import {ViewObject} from '../../directives/view-object';
import {Baseline} from './baseline/baseline';
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
        Baseline,
        Nav,
        NavTitle,
        Panel,
        Button,
        PopupMenu
    ]
})

export class View extends ViewObject {
    @ViewChild(Baseline) baseline: Baseline;
    @ViewChildren(PopupMenu) arrPopupMenu: QueryList<PopupMenu>;

    // view-object instances
    public items = new LinkedList<any>();
    // current recipe-object.
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
            this.load(recipeID);
        }
        this.active();
    }

    public load(recipeID: string) {
        if (!gRecipes[recipeID]) {
            // ...code here
        }
        console.log("load: ", recipeID);
        this.recipe = gRecipes[recipeID];
        this.recipe.syncChildrenIDB( (childrenData: LinkedList<IRecipeItem>) => {
            console.log(childrenData.size());
            this._syncDisplay(childrenData);
        });
    }

    // 화면에 뿌려진 뷰-오브젝트와 IDB데이터를 동기화.
    private _syncDisplay(childrenData: LinkedList<IRecipeItem>) {
        childrenData.forEach( (data: IRecipeItem) => {
            let item: any = this._getItem(data.id);
            if (item) {
                item.data.import(data);
            } else {
                let index: number = childrenData.indexOf(data);
                this.addItem(data.type, data, index - 1);
            }
            // item.deprecated = false;
        });
    }

    private _getItem(itemID: string): ViewObject {
        this.items.forEach( (item: any) => {
            if (itemID == item.id) {
                return item;
            }
        });
        return null;
    }

    // 이미 화면에 뿌려져 있는 뷰-아이템인가?
    private _alreadyDisplayd(itemID: string): boolean {
        if (this._getItem(itemID)) {
            return true;
        }
        return false;
    }

    // IndexedDB로 부터 자식 아이템들을 모두 읽어 온다.
    public loadItems() {
        // this._recipeService.downloadItems(this.recipeID);


        // this.storage.forEach( (data) => {
        //
        // });
        // this.addItem(ViewEmptyMsg);
    }

    // 새 뷰-오브젝트 아이템을 추가.
    public addItem(type: string, data?: IRecipeItem, headIndex?: number) {
        var target: any = this.baseline,
            component: any = DEF_VIEW_ITEM[type],
            nextIndex: number = 0;
        if (this.items.size() > 0) {
            if (headIndex) {
                target = this.items.elementAtIndex(headIndex);
            } else {
                target = this.items.last();
            }
            nextIndex = this.items.indexOf(target);
        }
        if (!data) {
            data = {
                id: this.newID(),
                index: nextIndex,
                type: type,
                parent: this.recipe.id,
                updated: Util.toUnixTimestamp(Config.now())
            };
        }
        this._dcl.loadNextToLocation(component, target.elementRef).then(ref => {
            let item = ref.instance;
            item.vid = data.id;
            item.data.import(data);
            this.items.add(item);

            // 중간에 아이템이 추가되면 인덱스 번호 재정렬
            // if (headIndex) {
            //     this._sortIndex(this.items);
            // }

            item.data.syncIDB();
        });
    }

    public removeItem(itemID?: string) {
        if (itemID) {

        } else {
            $('#view-content baseline').sibling().remove();
        }

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
}

export const DEF_VIEW_ITEM = {
    'empty-msg': ViewEmptyMsg,
    'header': ViewHeader
};
