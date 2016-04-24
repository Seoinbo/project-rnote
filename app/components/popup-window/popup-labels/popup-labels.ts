import {Component, ElementRef, ViewChild, ViewChildren, QueryList} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Config, Animation} from '../../../services/config';
import {Util, exceptRemoved} from '../../../services/util';
import {ViewObject} from '../../../directives/view-object/view-object';
import {Nav, NavTitle} from '../../nav/nav';
import {Panel, MultiPanel} from '../../panel/panel';
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
        Platform.prependBaseURL('directives/view-object/view-object.css'),
        Platform.prependBaseURL('components/popup-window/popup-window.css'),
        Platform.prependBaseURL('components/popup-window/popup-labels/popup-labels.css'),
        Platform.prependBaseURL('components/nav/nav.css'),
        Platform.prependBaseURL('components/panel/panel.css')
    ],
    directives: [
        Nav,
        NavTitle,
        Panel,
        MultiPanel,
        Button
    ],
    pipes: [
        exceptRemoved
    ]
})
export class PopupLabels extends PopupWindow {
    @ViewChild(MultiPanel) multiPanel: MultiPanel;
    @ViewChildren(Button) closeButtons: QueryList<Button>;

    private _editing: boolean = false;

    constructor(
        elementRef: ElementRef,
        private _labelService: LabelService
    ) {
        super(elementRef);
    }

    public ngAfterViewInit() {
        this.closeButtons.forEach( (button: Button) => {
            if (button.name == 'remove') {
                button.ready('zoom');
            }
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

    public enterEditMode() {
        this._editing = true;
        this.multiPanel.ibr.next();

        // 에니매이션 효과
        let i = 0;
        this.closeButtons.forEach( (button: Button) => {
            if (button.name == 'remove') {
                window.setTimeout( () => {
                    button.in('zoom');
                }, Animation.intervalTime * i++);
            }
        });
    }

    public exitEditMode() {
        this._editing = false;
        this.multiPanel.ibr.prev();

        // 에니매이션 효과
        let i = 0;
        this.closeButtons.forEach( (button: Button) => {
            if (button.name == 'remove') {
                window.setTimeout( () => {
                    button.out('zoom');
                }, Animation.intervalTime * i++);
            }
        });
    }
}
