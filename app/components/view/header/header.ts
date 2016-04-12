import {Component, ElementRef, Input} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {IRecipeDBObject} from '../../../services/recipedb';
import {ViewObject, IViewObject} from '../../../directives/view-object';

export interface IViewHeader extends IViewObject {
    text?: string;
}

@Component({
    selector: 'h1',
    templateUrl: Platform.prependBaseURL('components/view/header/header.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/header/header.css')
    ]
})
export class ViewHeader extends ViewObject implements IViewHeader, IRecipeDBObject {
    public type: string = 'header';
    
    @Input() text: string = "HEADER";

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    ngOnInit() {
    }
    
    public import(data: IViewHeader) {
        $.extend(this, data);
    }
    
    public export(): IViewHeader {
        return {
            id: this.id,
            index: this.index,
            parent: this.parent,
            updated: this.updated,
            type: this.type,
            text: this.text
        };
    }
    
    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("recipe_items", this.export(), () => {
                console.log("Complete syncIndexdDB() at " + this.type + ".");
                this._db.close();
            });
        });
    }
    
}
