import {Component, ElementRef} from 'angular2/core';
import {Button} from '../button';

@Component({
  selector: '.btn-nav',
  templateUrl: 'components/button/nav-button/nav-button.html',
  styleUrls: [
      'components/button/button.css',
      'components/button/nav-button/nav-button.css'
  ]
})

export class NavButton extends Button {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
