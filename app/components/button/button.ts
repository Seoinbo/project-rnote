import {Component, ElementRef, HostListener, EventEmitter, Input, Output} from 'angular2/core';
import {Platform} from '../../services/platform';
import {ClickEffect} from './click-effect/click-effect';

@Component({
  selector: 'button',
  templateUrl: Platform.prependBaseURL('components/button/button.html'),
  styleUrls: [Platform.prependBaseURL('components/button/button.css')],
  directives: [
      ClickEffect
  ]
})

export class Button {
    @Input() title: string = '';
    @Input() name: string = '';
    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    protected _element: HTMLElement;

    @HostListener('click', ['$event', 'name'])
    onClick (e: any, n: string) {
        this.btnClick.emit([e, n]);
    }

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
}
