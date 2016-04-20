import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {ViewObject} from '../../../directives/view-object';
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
        Platform.prependBaseURL('components/popup-window/popup-window.css'),
        Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css')
    ],
    directives: [
        Nav,
        NavTitle,
        Panel,
        Button
    ],
    providers: [
        LabelService
    ]
})
export class PopupLabels extends PopupWindow {
    constructor(
        elementRef: ElementRef,
        private _userAccount: UserAccount,
        private _labelService: LabelService
    ) {
        super(elementRef);
        this._labelService.userid = this._userAccount.user.id;
    }
    
    // Add a new label.
    public add() {
        let label = this._labelService.create();
        console.log(label);
        label.syncIDB();
        this._labelService.add(label);
    }
}
