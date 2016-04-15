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
    private _deprecated: boolean = false;
    
    @Input() text: string;

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this._data = new RecipeItem();
    }
    
    get data(): RecipeItem {
        return this._data;
    }
    
    set data(recipeItem: RecipeItem) {
        this._data = recipeItem;
    }
    
    get sources(): any {
        return this._data.sources;
    }
    
    set sources(data: any) {
        this._data.sources = data;
    }
    
    get deprecated(): boolean {
        return this._deprecated;
    }
    
    set deprecated(value: boolean) {
        this._deprecated = value;
    }
}
