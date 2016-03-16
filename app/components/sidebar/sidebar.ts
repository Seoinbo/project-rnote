import {Component} from 'angular2/core';
import {Recipenote} from '../recipenote';

@Component({
  selector: 'sidebar',
  templateUrl: 'components/sidebar/sidebar.html',
  styleUrls: ['components/sidebar/sidebar.css']
})

export class Sidebar {
    active: boolean = false;
    // recipenote: Recipenote;

    constructor() {
    }

    show(): void {
        this.active = true;
    }

    hide(): void {
        this.active = false;
    }

    toggle(): void {
        console.log(this.active);
        if (this.active) {
            this.hide();
        } else {
            this.show();
        }
    }
}
