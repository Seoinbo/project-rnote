import {Component, ElementRef, HostListener, EventEmitter, Output} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';

@Component({
  selector: 'nav',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      NavButton
  ]
})

export class Navigation {
    @Output() menuClick: EventEmitter<any> = new EventEmitter();

    protected _element: HTMLElement;

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }

    clickMenu() {
        this.menuClick.emit(null);
    }
}
