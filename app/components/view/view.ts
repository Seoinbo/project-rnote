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

    public load(recipeID: string): boolean {
        if (!gRecipes[recipeID]) {
            console.log("Not exsists recipe data.");
            return false;
        }

        this.recipe = gRecipes[recipeID];
        this.recipe.syncChildrenIDB( (childrenData: LinkedList<IRecipeItem>) => {
            console.log("load: ", recipeID, "size: ", childrenData.size());
            this._syncDisplay(childrenData);
        });
        return true;
    }

    // 화면에 뿌려진 뷰-오브젝트와 IDB데이터를 동기화.
    private _syncDisplay(childrenData: LinkedList<IRecipeItem>) {
        let dbIDList: Array<string> = [];
        childrenData.forEach( (data: IRecipeItem) => {
            dbIDList.push(data.id);
        });

        // DB에 없는 컴포넌트는 화면에서 제거.
        if (!this.viewComponents.isEmpty()) {
            this.viewComponents.forEach( (ref: ComponentRef) => {
                if (dbIDList.indexOf(ref.instance.id) == -1) {
                    this.removeViewComponent(ref.instance.id);
                }
            });
        }

        // 화면에 없는 컴포넌트 추가(랜더링)하기.
        this.addViewComponentByNode(childrenData.firstNode, () => {
            // ...code here
        });
    }

    private _getViewComponentByID(itemID: string): ComponentRef {
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
        if (this._getViewComponentByID(itemID)) {
            return true;
        }
        return false;
    }

    // DB에 없는 새 컴포넌트 아이템을 생성.
    public createViewComponent(type: string, complete?: Function) {
        let data = this.recipe.createChild(type);
        this.recipe.addChild(data);
        this.addViewComponent(data, complete);
    }

    // 새 뷰-오브젝트 아이템을 추가.
    // index - 아이템을 append할 위치값
    public addViewComponent(data: IRecipeItem, complete?: Function): boolean {
        // 해당 타겟의 아래에 컴포넌트를 추가. ('baseline'은 최상단에 숨겨놓은 엘리먼트)
        // 뷰 페이지가 빈 상태이면 이 것을 기준으로 아이템을 append 한다.
        let target: any = this.baseline;
        let component: any = viewComponentObject(data.type);

        // 이미 뷰에 존재한다면, 데이터만 업데이트한다.
        let componentRef: ComponentRef = this._getViewComponentByID(data.id);
        if (componentRef) {
            console.log("already displayed: ", data.id);
            componentRef.instance.import(data);
            if (complete) {
                complete.apply(null, [componentRef]);
            }
            return true;
        }

        // 삽입할 위치 선정.
        if (data.index) {
            let temp = this.viewComponents.elementAtIndex(data.index - 1);
            if (temp) {
                target = temp.instance;
            }
        }

        // 화면에 랭더링.
        this._dcl.loadNextToLocation(component, target.elementRef).then( (cref: ComponentRef) => {
            console.log("add new component to display: ", data.id);
            let item: RecipeItem = cref.instance;
            item.viewid = data.id;
            item.import(data);
            item.touch();

            // 중간에 아이템이 추가되면 인덱스 번호 재정렬
            // if (headIndex) {
            //     this._sortIndex(this.items);
            // }

            item.syncIDB();
            this.viewComponents.add(cref);
            if (complete) {
                complete.apply(null, [cref]);
            }
        });
        return true;
    }

    // LinkedList를 이용해 컴포넌트 추가 작업을 동기(sync)로 수행한다.
    // -> DCL을 통한 컴포넌트 랜더링 작업은 비동기로 수행된다.
    public addViewComponentByNode(node: ILinkedListNode<IRecipeItem>, complete?: Function) {
        let data = node.element;
        this.addViewComponent(data, (item: RecipeItem) => {
            if (!node.next) {
                if (complete) {
                    complete.apply(null, []);
                }
                return false;
            }
            this.addViewComponentByNode(node.next, complete);
        });
    }

    public removeViewComponent(instanceID?: string) {
        let componentRef = this._getViewComponentByID(instanceID);
        this._removeViewComponentByRef(componentRef);
    }

    private _removeViewComponentByRef(cref?: ComponentRef) {
        if (cref) {
            this.viewComponents.remove(cref);
            cref.dispose();
            console.log('remove a component from display: ', cref.instance.id);
        } else {
            this.viewComponents.clear();
            this.viewComponents.forEach( (r: ComponentRef) => {
                r.dispose();
            });
            console.log('remove all component from display, total => ', this.viewComponents.size());
        }
    }

    // 현재 보고 있는 레시피를 휴지통에 버림.
    public remove() {
        this.recipe.remove();
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

export function viewComponentObject(type: string): any {
    let component: any;
    switch(type) {
        case 'empty-msg':
            component = ViewEmptyMsg;
            break;
        case 'header':
            component = ViewHeader;
            break;
    }
    return component;
}
