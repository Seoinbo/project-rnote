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
import {RecipeService, Recipe} from '../../services/recipe';

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
    
    storage = [
        {
            type: 'header',
            text: 'hello header'
        }
    ];

    constructor(elementRef: ElementRef, private _dcl: DynamicComponentLoader) {
        super(elementRef);
        this.active();
        this.initViewItem();
        
        // insert test db.
        // var request = indexedDB.open("rnote", 3);
        // var db:any = null;
        // request.onupgradeneeded = function(e: any) {
        //     console.log('onupgradeneeded');
        //     db = e.target.result;
        //     if(db.objectStoreNames.contains("recipes")) {
        //         db.deleteObjectStore("recipes");
        //     }
        //     
        //     store = db.createObjectStore("recipes", {keyPath: "id"});
        // };
        // request.onsuccess = function(e: any) {
        //     console.log('onsuccess');
        //     db = e.target.result;
        // }
        // 
        // var trans: any;
        // var store: any;
        // window.setTimeout( () => {
        //     trans = db.transaction(['recipes'], 'readwrite');
        //     store = trans.objectStore("recipes");
        // 
        //     store.put({
        //         id: Math.round(new Date().getTime()/1000),
        //         owner: 'seo4234',
        //         name: 'recipeItem1',
        //         updated: (new Date().getTime()/1000),
        //         items: []
        //     });
        //     store.put({
        //         id: Math.round(new Date().getTime()/1000)+10,
        //         owner: 'seo4234',
        //         name: 'recipeItem2',
        //         updated: (new Date().getTime()/1000),
        //         items: []
        //     });
        //     store.put({
        //         id: Math.round(new Date().getTime()/1000)+20,
        //         owner: 'seo4234',
        //         name: 'recipeItem3',
        //         updated: (new Date().getTime()/1000),
        //         items: []
        //     });
        // }, 2000);
        
    }

    ngAfterViewInit() {
        Util.extractViewChildren(this, [this.arrPopupMenu]);
    }

    public initViewItem() {
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
}

export const DEF_VIEW_ITEM = {
    'empty-msg': ViewEmptyMsg,
    'header': ViewHeader
};
