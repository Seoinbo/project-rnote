import {
    Component,
    EventEmitter,
    Output,
    ElementRef
} from 'angular2/core';

@Component({
  selector: 'sidebar',
  templateUrl: 'components/sidebar/sidebar.html',
  styleUrls: ['components/sidebar/sidebar.css']
})

export class Sidebar {
    @Output() sidebarClose: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    hide() {
        this.sidebarClose.emit(null);
    }

}
