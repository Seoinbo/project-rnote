import {Component, ElementRef, ViewChild, ViewChildren, QueryList, Input} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Config} from '../../../services/config';
import {Util, exceptRemoved} from '../../../services/util';
import {ViewObject} from '../../../directives/view-object/view-object';
import {Animate, AniList} from '../../../directives/animate/animate';
import {Nav, NavTitle} from '../../nav/nav';
import {Panel} from '../../panel/panel';
import {Button} from '../../button/button';
import {PopupWindow} from '../popup-window';
import {ILinkedListNode, LinkedList} from '../../../services/collections/LinkedList';
import {LabelService, Label, ILabel} from '../../../services/label';
import {UserAccount, User} from '../../../services/user-account';

declare var $: any;

@Component({
    selector: 'popup-window[labels]',
    templateUrl: Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.html'),
    styleUrls: [
        Platform.prependBaseURL('directives/animate/animate.css'),
        Platform.prependBaseURL('components/popup-window/popup-window.css'),
        Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css')
    ],
    directives: [
        Animate,
        Nav,
        NavTitle,
        Panel,
        Button,
        ViewObject
    ],
    pipes: [
        exceptRemoved
    ]
})
export class PopupLabels extends PopupWindow {
    _name: string = 'asdf';
    
    @Input ()
    set name(name: string) {
        console.log(name);
        this._name = name;
    }
    
    get name() {
        return this._name;
    }
    
    private _aniRemoveButtons: AniList;
    private _aniMoveButtons: AniList;
    private _currentFocusIndex: number = 0;
    private _editingStates: Array<boolean> = [];

    constructor(
        elementRef: ElementRef,
        private _labelService: LabelService
    ) {
        super(elementRef);
    }

    public ngAfterViewInit() {
        $(this._element).find('input[type=text]').on("focus", (e: Event, i: number) => {
            let $target: any = $(e.target);
            $target.parent().parent('li').attr('editing', true);
        });
        
        $(this._element).find('input[type=text]').on("focusout", (e: Event, i: number) => {
            let $target: any = $(e.target);
            $target.parent().parent('li').attr('editing', false);
        });
    }

    // Add a new label.
    public add() {
        let label = this._labelService.create();
        label.syncIDB();
        this._labelService.add(label);
    }

    public removeLabel(id: string) {
        this._labelService.remove(id);
    }
    
    private _focusNext() {
        window.setTimeout( () => {
            let children: NodeListOf<any> = this._element.querySelectorAll('.content li.label .title input[type=text]');
            let length: number = children.length;
            let current: number = this._currentFocusIndex;
            if (current > length -1) {
                current = length -1;
            }
            for (let i = 0; i <= length; i++) {
                if (current == i) {
                    children[i].focus();
                    break;
                }
            }
        }, 100);
    }
    
    private _focusLabelName(index: number) {
        this._editingStates[index] = true;
        this._currentFocusIndex = index;
    }
    
    private _focusOutLabelName(index: number) {
        this._editingStates[index] = false;
        console.log(this._labelService.labels.toArray());
        
    }
}
