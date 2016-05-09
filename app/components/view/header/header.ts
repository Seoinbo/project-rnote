import {
    Component,
    ElementRef,
    Input,
    QueryList,
    ViewChildren
} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Util} from '../../../services/util';
import {IRecipeItem, RecipeItem} from '../../../services/recipe';
import {ViewObject} from '../../../directives/view-object/view-object';
import {ViewItem, IViewItem} from '../view-item';
import {Button} from '../../button/button';
import {Animate} from '../../../directives/animate/animate';

declare var $: any;

export interface IViewHeader {
    heading: string
}

@Component({
    selector: 'h1',
    templateUrl: Platform.prependBaseURL('components/view/header/header.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/view-item.css'),
        Platform.prependBaseURL('components/view/header/header.css'),
        Platform.prependBaseURL('directives/animate/animate.css')
    ],
    directives: [
        Animate,
        Button
    ],
    host: {
        "[attr.editing]": "editing"
    }
})
export class ViewHeader extends ViewItem implements IViewItem, IViewHeader {
    @ViewChildren(Button) arrButton: QueryList<Button>;
    @ViewChildren(Animate) arrAnimate: QueryList<Animate>;
    
    private _headerMoveButton: Button;
    private _headerMoveButtonAni: Animate;
    private _headerTrashButton: Button;
    private _headerTrashButtonAni: Animate;
    
    public heading: string = 'Heading';

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
    
    ngAfterViewInit() {
        this.initDefault();
        
        Util.extractViewChildren(this, [
            this.arrButton
        ]);
        Util.extractViewChildren(this, [this.arrAnimate], 'Ani');
        
        this._headerMoveButton.visibility = false;
        this._headerTrashButton.visibility = false;
    }
    
    public initDefault() {
        this.source = $.extend({
            heading: "New Heading"
        }, this.source);
    }

    public enterEditMode() {
        this.editing = true;
        this._headerMoveButton.show();
        this._headerTrashButton.show();
    }

    public exitEditMode() {
        this.editing = false;
        this._headerMoveButton.hide();
        this._headerTrashButton.hide();
        this.touch().syncIDB();
    }
    
    public trash() {
        this.remove();
        this.touch().syncIDB();
        window.setTimeout( () => {
            this.cref.dispose();
        }, 0);
    }
}
