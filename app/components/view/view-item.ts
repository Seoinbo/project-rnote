import {Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Query,
    QueryList,
    ViewChildren,
    ComponentRef
} from 'angular2/core';

import {Animate} from "../../directives/animate/animate";
import {Util, String} from "../../services/util";
import {IRecipeItem, RecipeItem} from '../../services/recipe';

export interface IViewItem {
    initDefault(): void,
    enterEditMode(): void,
    exitEditMode(): void,
    trash(): void
}

@Directive({
    selector: '[view-item]'
})
export class ViewItem extends RecipeItem {
    protected _element: HTMLElement;
    protected _animate: Animate;

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this._animate = new Animate(elementRef);
    }

    ngAfterViewInit() {
        // this.initEvent();
    }
    

}
