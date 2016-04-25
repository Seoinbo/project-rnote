import {Component, ElementRef, ViewChild, ViewChildren, QueryList} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Config} from '../../../services/config';
import {Util, exceptRemoved} from '../../../services/util';
import {ViewObject} from '../../../directives/view-object/view-object';
import {Animate, AniList} from '../../../directives/animate/animate';
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
    @ViewChildren(Animate) aniObjects: QueryList<Animate>;

    private _editing: boolean = false;
    private _aniRemoveButtons: AniList;

    constructor(
        elementRef: ElementRef,
        private _labelService: LabelService
    ) {
        super(elementRef);
        
    }

    public ngAfterViewInit() {
        this.aniObjects.forEach( (object: Animate) => {
            if (object.element.getAttribute('name') == 'remove') {
                object.ready('zoom');
            }
        });
        
        // subscribe aniobject change.
        this._aniRemoveButtons = new AniList(this.aniObjects.toArray(), 'remove');
        this.aniObjects.changes.subscribe( () => {
            this._aniRemoveButtons.import(this.aniObjects.toArray(), 'remove');
        });
        
        // ready for animations.
        this._aniRemoveButtons.streamReady('zoom', null, 0);
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
        this._aniRemoveButtons.streamIn('zoom');
    }

    public exitEditMode() {
        this._editing = false;
        this.multiPanel.ibr.prev();
        // 에니매이션 효과
        this._aniRemoveButtons.streamOut('zoom');
    }
}
