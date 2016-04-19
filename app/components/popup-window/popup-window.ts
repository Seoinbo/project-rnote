import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../services/platform';
import {ViewObject} from '../../directives/view-object';

@Component({
    selector: 'popup-window',
    templateUrl: Platform.prependBaseURL('components/popup-window/popup-window.html'),
    styleUrls: [
        Platform.prependBaseURL('components/popup-window/popup-window.css')
    ]
})
export class PopupWindow extends ViewObject {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
