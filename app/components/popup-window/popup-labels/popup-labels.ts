import {Component, ElementRef, ViewChild, ViewChildren, QueryList, Input} from 'angular2/core';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
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
        Dragula,
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
    private _aniRemoveButtons: AniList;
    private _aniMoveButtons: AniList;
    private _currentFocusIndex: number = 0;
    private _editingStates: Array<boolean> = [];
    private _mode: string = 'view'; // 'view'|'select'
    private _currentRecipeID: string;

    constructor(
        elementRef: ElementRef,
        private _labelService: LabelService,
        private _dragulaService: DragulaService
    ) {
        super(elementRef);
        console.log(this._dragulaService.setOptions);
        this._dragulaService.setOptions('bag-one', {
            direction: 'vertical'
        });
        this._dragulaService.drag.subscribe((value: any) => {
          console.log(`drag: ${value[0]}`);
          this.onDrag(value.slice(1));
        });
        this._dragulaService.drop.subscribe((value: any) => {
          console.log(`drop: ${value[0]}`);
          this.onDrop(value.slice(1));
        });
        this._dragulaService.over.subscribe((value: any) => {
          console.log(`over: ${value[0]}`);
          this.onOver(value.slice(1));
        });
        this._dragulaService.out.subscribe((value: any) => {
          console.log(`out: ${value[0]}`);
          this.onOut(value.slice(1));
        });
    }
    
    private onDrag(args: any) {
        let [e, el] = args;
        // do something
      }

  private onDrop(args: any) {
    let [e, el] = args;
    // do something
  }

  private onOver(args: any) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args: any) {
    let [e, el, container] = args;
    // do something
  }

    public ngAfterViewInit() {
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
}
