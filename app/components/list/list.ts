import {Component, ElementRef, EventEmitter, Output} from 'angular2/core';
import {ClickEffect} from '../button/click-effect/click-effect';

@Component({
  selector: 'list',
  templateUrl: 'components/list/list.html',
  styleUrls: ['components/list/list.css'],
  directives: [
      ClickEffect
  ]
})

export class List {
    constructor() {
        console.log(1);
    }
}
