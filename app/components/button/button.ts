import {Component, ElementRef, HostListener, EventEmitter, Input, Output} from 'angular2/core';
import {ClickEffect} from './click-effect/click-effect';

@Component({
  selector: '.btn-default',
  templateUrl: 'components/button/button.html',
  styleUrls: ['components/button/button.css'],
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
