import {Component, ElementRef, EventEmitter, Output} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';

@Component({
  selector: 'navigation',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      NavButton
  ]
})

export class Navigation {
    @Output() menuClick: EventEmitter<any> = new EventEmitter();

    protected element: HTMLElement;
    
    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    click() {
        this.menuClick.emit(null);
    }
}
