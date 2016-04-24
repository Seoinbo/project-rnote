import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {ViewObject} from '../../../directives/view-object/view-object';

@Component({
    selector: 'baseline',
    templateUrl: Platform.prependBaseURL('components/view/baseline/baseline.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/baseline/baseline.css')
    ]
})
export class Baseline extends ViewObject {
    public type: string = 'baseline';

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
