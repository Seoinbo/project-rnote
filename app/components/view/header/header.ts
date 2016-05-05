import {Component, ElementRef, Input} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {IRecipeItem, RecipeItem} from '../../../services/recipe';
import {ViewObject} from '../../../directives/view-object/view-object';
import {ViewItem, IViewItem} from '../view-item';

export interface IViewHeader {
    heading: string
}

@Component({
    selector: 'h1',
    templateUrl: Platform.prependBaseURL('components/view/header/header.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/view-item.css'),
        Platform.prependBaseURL('components/view/header/header.css')
    ],
    host: {
        "[attr.editing]": "editing"
    }
})
export class ViewHeader extends ViewItem implements IViewItem, IViewHeader {
    public heading: string = 'Heading';

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.editing = true;
    }

    public enterEditMode() {
        this.editing = true;
    }

    public exitEditMode() {
        this.editing = false;
    }
}
