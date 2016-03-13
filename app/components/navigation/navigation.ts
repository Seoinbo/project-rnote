import {Component} from 'angular2/core';
import {DefaultButton} from '../button/default-button';

@Component({
  selector: 'navigation',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      DefaultButton
  ]
})

export class Navigation {
}
