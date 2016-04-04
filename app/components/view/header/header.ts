import {Component, ElementRef, Input} from 'angular2/core';
import {Platform} from '../../../services/platform';
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
    @Input() text: string = "HEADER";

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    ngOnInit() {
        console.log(this.type);
    }
    
    
}
