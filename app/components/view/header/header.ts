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
export class ViewHeader extends ViewObject {
    public type: string = 'header';
    private _data: RecipeItem;
    
    @Input() text: string;

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this._data = new RecipeItem();
    }
    
    get data(): RecipeItem {
        return this._data;
    }
    
    set data(recipeItemRef: RecipeItem) {
        this._data = recipeItemRef;
    }
    
    get sources(): any {
        return this._data.sources;
    }
    
    set sources(data: any) {
        this._data.sources = data;
    }
}
