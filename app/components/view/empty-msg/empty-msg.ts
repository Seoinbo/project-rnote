import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {ViewObject} from '../../../directives/view-object';

@Component({
    selector: 'p[view-empty-msg]',
    templateUrl: Platform.prependBaseURL('components/view/empty-msg/empty-msg.html'),
    styleUrls: [
        Platform.prependBaseURL('components/view/empty-msg/empty-msg.css')
    ]
})
export class ViewEmptyMsg extends ViewObject {
    public type: string = 'view-empty-msg';

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    ngOnInit() {
    }
}
