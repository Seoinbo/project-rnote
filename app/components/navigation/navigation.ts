import {Component, ElementRef} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';
import {Button} from '../button/button';
import {Sidebar} from '../sidebar/sidebar';

@Component({
  selector: 'navigation',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      NavButton
  ]
})

export class Navigation {
    element: Element;
    // sidebar: Sidebar = new Sidebar();
    
    constructor(elementRef: ElementRef) {
        // console.log(document.querySelector('sidebar'));
        console.log(elementRef);
        // this.element = elementRef.nativeElement;
    }
    
    ngOnInit() {
        // 네비게이션 버튼 바인딩
        // this.element.querySelector('.menu').addEventListener('click', (e: Event) => {
        //     e.preventDefault();
        //     // this.sidebar.toggle();
        // }, true);
    }

}
