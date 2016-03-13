import {Component} from 'angular2/core';

@Component({
  selector: '.btn-default',
  templateUrl: 'components/button/default-button.html',
  styleUrls: ['components/button/default-button.css'],
  inputs: [
      'title'
  ]
})

export class DefaultButton {
    title: string = '';
}
