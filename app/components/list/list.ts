import {Component, Directive, ElementRef, EventEmitter, Input, Output} from 'angular2/core';
import {Platform} from '../../services/platform';
import {ClickEffect} from '../button/click-effect/click-effect';
import {Recipe} from '../../services/recipe'

@Directive({
  selector: 'list'
})

export class List {
    constructor() {
    }
}

@Component({
    selector: 'list item',
    templateUrl: Platform.prependBaseURL('components/list/recipeItem.html'),
    styleUrls: [Platform.prependBaseURL('components/list/recipeItem.css')],
    directives: [
        ClickEffect
    ]
})

export class RecipeItem {
    protected _element: HTMLElement;
    @Input('recipeData') _recipe: Recipe;
    
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
