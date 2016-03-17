import {
    Component, 
    Query, 
    QueryList,
    ElementRef
} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';
import {Sidebar} from '../sidebar/sidebar';
import {Recipenote} from '../recipenote';

@Component({
  selector: 'navigation',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      NavButton
  ],
  providers: [
      Sidebar
  ]
})

export class Navigation {
    element: Element;
    sidebar: Sidebar;
    
    constructor(sidebar: Sidebar) {
        this.sidebar = sidebar;
    }
    
    toggleSidebar() {
        this.sidebar.toggle();
    }
}
