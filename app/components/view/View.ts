import {Component, ElementRef} from 'angular2/core';
// import {Navigation} from '../navigation/navigation';

@Component({
    selector: 'view',
    templateUrl: 'components/view/view.html',
    styleUrls: ['components/view/view.css'],
    // directives: [
    //     Navigation
    // ]
})

export class View {
    protected element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }
}
