import {Component, ElementRef} from 'angular2/core';
import {Button} from '../button';

@Component({
  selector: '.btn-sidebar',
  templateUrl: 'components/button/sidebar-button/sidebar-button.html',
  styleUrls: [
      'components/button/button.css',
      'components/button/sidebar-button/sidebar-button.css'
  ]
})

export class SidebarButton extends Button {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
