import {Component, ElementRef, ViewChild, ViewChildren, QueryList, Input} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {Platform} from '../../../services/platform';
import {Config} from '../../../services/config';
import {Util, exceptRemoved} from '../../../services/util';
import {ViewObject} from '../../../directives/view-object/view-object';
import {Animate, AniList} from '../../../directives/animate/animate';
import {SlipSortable} from '../../../directives/slip-sortable/slip-sortable';
import {Nav, NavTitle} from '../../nav/nav';
import {Panel} from '../../panel/panel';
import {Button} from '../../button/button';
import {PopupWindow} from '../popup-window';
import {ILinkedListNode, LinkedList} from '../../../services/collections/LinkedList';
import {LabelService, Label, ILabel} from '../../../services/label';
import {UserAccount, User} from '../../../services/user-account';


declare var $: any;
declare var Slip: any;

@Component({
    selector: 'popup-window[labels]',
    templateUrl: Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.html'),
    styleUrls: [
        Platform.prependBaseURL('directives/animate/animate.css'),
        Platform.prependBaseURL('components/popup-window/popup-window.css'),
        Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css'),
        Platform.prependBaseURL('directives/slip-sortable/slip-sortable.css'),
        
    ],
    directives: [
        Dragula,
        SlipSortable,
        Animate,
        Nav,
        NavTitle,
        Panel,
        Button,
        ViewObject
    ],
    viewProviders: [
        DragulaService
    ],
    pipes: [
        exceptRemoved
    ]
})
export class PopupLabels extends PopupWindow {
    @ViewChildren(Animate) arrAnimate: QueryList<Animate>;
    
    private _aniRemoveButtons: AniList;
    private _aniMoveButtons: AniList;
    private _currentFocusIndex: number = 0;
    private _editingStates: Array<boolean> = [];
    private _mode: string = 'view'; // 'view'|'select'
    private _currentRecipeID: string;
    private _slipContainer: any;

    constructor(
        elementRef: ElementRef,
        private _labelService: LabelService,
        private _dragulaService: DragulaService
    ) {
        super(elementRef);
    }

    public ngAfterViewInit() {
    }

    // Add a new label.
    public add() {
        let label = this._labelService.create();
        label.syncIDB();
        this._labelService.add(label);
        this._focusNext(this._labelService.labels.size() - 1);
    }

    public removeLabel(id: string) {
        this._labelService.remove(id);
    }
    
    public select(recipeID: string) {
        this._currentRecipeID = recipeID;
        this._mode = 'select';
        this.open();
    }
    
    public view() {
        this._currentRecipeID = null;
        this._mode = 'view';
        this.open();
    }
    
    private _focusNext(prevIndex?: number) {
        window.setTimeout( () => {
            let children: NodeListOf<any> = this._element.querySelectorAll('.content li.label .title input[type=text]');
            let length: number = children.length;
            let current: number = this._currentFocusIndex;
            if (prevIndex) {
                current = prevIndex;
            }
            if (current > length -1) {
                current = length -1;
            }
            for (let i = 0; i <= length; i++) {
                if (current == i) {
                    children[i].focus();
                    break;
                }
            }
        }, 0);
    }

    private _onFocusName(index: number) {
        this._editingStates[index] = true;
        this._currentFocusIndex = index;
    }

    private _onFocusOutName(index: number, label: Label) {
        this._editingStates[index] = false;
        // Sync label-name with IDB.
        if (label.changed('name')) {
            label.touch().syncIDB();
        }
    }
    
    private _onChangeCheckbox(e: Event, label: Label) {
        let target: any = e.target;
        if (target.checked) {
            label.recipes.push(this._currentRecipeID);
        } else {
            Util.removeArrayElementByValue(label.recipes, this._currentRecipeID);
        }
        
        // Sync label-data with IDB.
        if (label.changed('recipes')) {
            label.touch().syncIDB();
        }
    }
    
    private _reorderList(e: any) {
        let index: number = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
        
        let nextIndex: number = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        
        let temp: Label = this._labelService.labels.elementAtIndex(index);
        this._labelService.labels.removeElementAtIndex(index);
        this._labelService.labels.add(temp, nextIndex);
        
        let i = 0;
        this._labelService.labels.forEach( (item: Label) => {
            item.index = i++;
            item.touch().syncIDB();
        });
        
        
        console.log("reorderEvent: ", index, nextIndex);
        return false;
    }
    
    private _beforewait(e: any) {
        
    }
}
