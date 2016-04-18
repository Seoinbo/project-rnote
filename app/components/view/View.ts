import {
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    DynamicComponentLoader,
    ComponentRef
} from 'angular2/core';

declare var $: any;

import {Util, String} from '../../services/util';
import {Platform} from '../../services/platform';
import {LinkedList, ILinkedListNode} from '../../services/collections/LinkedList';
import {RecipeService, Recipe, gRecipes, IRecipeItem, RecipeItem} from '../../services/recipe';
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
    public viewComponents = new LinkedList<ComponentRef>();
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
            console.log("list size: ", childrenData.size());
            this._syncDisplay(childrenData);
        });
    }
    
    // 화면에 뿌려진 뷰-오브젝트와 IDB데이터를 동기화.
    private _syncDisplay(childrenData: LinkedList<IRecipeItem>) {
        let tempIDs: Array<string> = [];

        // DB 데이터를 추가하거나 업데이트.
        childrenData.forEach( (data: IRecipeItem) => {
            let ref: ComponentRef = this._getItemByID(data.id);
            if (ref) {
                ref.instance.import(data);
                console.log('update view item: ', data.id);
            }
            tempIDs.push(data.id);
        });
        
        this._addMutilItem(childrenData.firstNode, () => {
            // 더 이상 DB에 존재하지 않는 오브젝트는 화면에서 제거.
            this.viewComponents.forEach( (ref: ComponentRef) => {
                let i: number = tempIDs.indexOf(ref.instance.id);
                if (i == -1) {
                    this.removeItem(ref.instance.id);
                    console.log('remove view item: ', ref.instance.id);
                } else {
                    tempIDs[i] = null;
                }
            });
        });
    }
    
    private _addMutilItem(node: ILinkedListNode<IRecipeItem>, complete?: Function) {
        let data = node.element;
        this.addItem(data, (item: RecipeItem) => {
            console.log('add view item: ', data.id);
            if (!node.next) {
                if (complete) {
                    complete.apply(null, []);
                }
                return false;
            }
            this._addMutilItem(node.next, complete);
        });
    }

    private _getItemByID(itemID: string): ComponentRef {
        let retv: ComponentRef = null;
        this.viewComponents.forEach( (item: ComponentRef) => {
            if (itemID == item.instance.id) {
                retv = item;
                return false;
            }
        });
        return retv;
    }

    // 이미 화면에 뿌려져 있는 뷰-아이템인가?
    private _alreadyDisplayd(itemID: string): boolean {
        if (this._getItemByID(itemID)) {
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
    
    private _createItemData(type: string, index?: number): IRecipeItem {
        return {
            id: this.newID(),
            index: index ? index : 0,
            type: type,
            parent: this.recipe.id,
            updated: Util.toUnixTimestamp(Config.now())
        };
    }
    
    public addNewItem(type: string, complete?: Function) {
        // 삽입될 위치 인덱스값. 목록의 마지막에 추가.
        let index: number = this.viewComponents.size();
        let data = this._createItemData(type);
        this.addItem(data, complete);
    }

    // 새 뷰-오브젝트 아이템을 추가.
    // index - 아이템을 append할 위치값
    public addItem(data: IRecipeItem, complete?: Function): boolean {
        // 해당 타겟의 아래에 아이템을 추가.
        // 'baseline'은 최상단에 숨겨놓은 엘리먼트.
        // 뷰 페이지가 빈 상태이면 이 것을 기준으로 아이템을 append 한다.
        let target: any = this.baseline;
        let component: any = DEF_VIEW_ITEM[data.type];
        let nextIndex: number = 0;
        
        // 이미 뷰에 존재한다면
        if (this._alreadyDisplayd(data.id)) {
            console.log("alreayDisplayed");
            if (complete) {
                complete.apply(null, []);
            }
            return false;
        }
        
        if (data.index) {
            let tempRef = this.viewComponents.elementAtIndex(data.index - 1);
            if (tempRef) {
                target = tempRef.instance;
            }
        }
        
        console.log(target);

        this._dcl.loadNextToLocation(component, target.elementRef).then( (ref: ComponentRef) => {
            let item = ref.instance;
            item.viewid = data.id;
            item.import(data);
            
            // 중간에 아이템이 추가되면 인덱스 번호 재정렬
            // if (headIndex) {
            //     this._sortIndex(this.items);
            // }

            item.syncIDB();
            this.viewComponents.add(ref);
            if (complete) {
                complete.apply(null, [ref]);
            }
        });
        
        return true;
    }

    public removeItem(itemID?: string) {
        let componentRef = this._getItemByID(itemID);
        if (itemID) {
            componentRef.dispose();
            this.viewComponents.remove(componentRef);
        } else {
            this.viewComponents.forEach( (ref: ComponentRef) => {
                ref.dispose();
            });
            this.viewComponents.clear();
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
