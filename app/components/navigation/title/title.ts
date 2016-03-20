import {Component, ElementRef, HostListener, EventEmitter, Input, Output} from 'angular2/core';

@Component({
  selector: 'nav > title',
  templateUrl: 'components/navigation/title/title.html',
  styleUrls: ['components/navigation/title/title.css']
})

export class Title {
    @Input() title: string = '';

    protected _element: HTMLElement;

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
}
