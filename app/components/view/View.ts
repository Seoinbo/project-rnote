import {
    Component,
    ElementRef,
    QueryList,
    ViewChildren
} from 'angular2/core';

import {Util, String} from '../../services/util';
import {Platform} from '../../services/platform';
import {LinkedList, ILinkedListNode} from '../../services/collections/LinkedList';

import {ViewObject} from '../../directives/view-object';
import {ViewHeader} from './header/header';
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
        Nav,
        NavTitle,
        Panel,
        Button,
        PopupMenu
    ]
})

export class View extends ViewObject {
    @ViewChildren(PopupMenu) arrPopupMenu: QueryList<PopupMenu>;

    public items = new LinkedList<any>();

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.active();
    }

    ngAfterViewInit() {
        Util.extractViewChildren(this, [this.arrPopupMenu]);
    }

    addViewItem(type: string) {
        this.items.add(ViewHeader);
        console.log('addItem', this.items.toArray());
    }
}
