import {Component} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';
import {Button} from '../button/button';

@Component({
  selector: 'navigation',
  templateUrl: 'components/navigation/navigation.html',
  styleUrls: ['components/navigation/navigation.css'],
  directives: [
      NavButton
  ]
})

export class Navigation {
}
