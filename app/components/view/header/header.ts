import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {ViewObject} from '../../../directives/view-object';

@Component({
    selector: 'view-header',
    templateUrl: Platform.prependBaseURL('components/view/header/header.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/header/header.css')
    ]
})
export class ViewHeader extends ViewObject {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    ngOnInit() {
        console.log(1);
    }
}
