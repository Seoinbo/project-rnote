import {Component, Directive, ElementRef, EventEmitter, Input, Output} from 'angular2/core';
import {Platform} from '../../services/platform';
import {ClickEffect} from '../button/click-effect/click-effect';
import {Recipe, IRecipe} from '../../services/recipe'

@Directive({
  selector: 'list'
})

export class List {
    constructor() {
    }
}

@Component({
    selector: 'list item',
    templateUrl: Platform.prependBaseURL('components/list/recipe-item.html'),
    styleUrls: [Platform.prependBaseURL('components/list/recipe-item.css')],
    directives: [
        ClickEffect
    ]
})
export class ListItem {
    @Input('recipeData') _recipe: Recipe;
    private _element: HTMLElement;
    
    constructor(elementRef: ElementRef) {
        this._element = elementRef.nativeElement;
    }
    
    get recipe():Recipe {
        return this._recipe;
    }
    
    set recipe(value: Recipe) {
        this._recipe = value;
    }
    
}
