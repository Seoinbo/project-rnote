import {Component, ElementRef, Input} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {IRecipeItem, RecipeItem} from '../../../services/recipe';
import {ViewObject} from '../../../directives/view-object';

@Component({
    selector: 'h1',
    templateUrl: Platform.prependBaseURL('components/view/header/header.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/header/header.css')
    ]
})
export class ViewHeader extends RecipeItem {
    @Input() text: string;

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.type = 'header';
    }
}
