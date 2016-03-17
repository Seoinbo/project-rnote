import {
    Component,
    EventEmitter,
    Output
} from 'angular2/core';

@Component({
  selector: 'sidebar',
  templateUrl: 'components/sidebar/sidebar.html',
  styleUrls: ['components/sidebar/sidebar.css'],
  events: [
      'onChangeDisplay'
  ]
})

export class Sidebar {
    protected active: boolean = false;
    onChangeDisplay: EventEmitter<any> = new EventEmitter();
    
    show(): void {
        console.log("show");
        this.active = true;
        this.onChangeDisplay.emit(true);
    }

    hide(): void {
        console.log("hide");
        this.active = false;
        this.onChangeDisplay.emit(false);
    }

    toggle(): void {
        if (this.active) {
            this.hide();
        } else {
            this.show();
        }
    }
}
