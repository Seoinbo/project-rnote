import {Component, ElementRef, HostListener, EventEmitter, Input, Output} from 'angular2/core';
import {Platform} from '../../services/platform';
import {ViewObject} from '../../directives/view-object/view-object';
import {ClickEffect} from './click-effect/click-effect';

@Component({
    selector: 'button',
    templateUrl: Platform.prependBaseURL('components/button/button.html'),
    styleUrls: [Platform.prependBaseURL('components/button/button.css')],
    directives: [
        ClickEffect
    ]
})
export class Button extends ViewObject {
    @Input() title: string = '';
    @Input() name: string = '';
    @Input() id: string;
    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    protected _element: HTMLElement;

    @HostListener('click', ['$event', 'name'])
    onClick (e: any, n: string) {
        // this.btnClick.emit([e, n]);
    }

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
