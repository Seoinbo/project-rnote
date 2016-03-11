import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
  selector: 'app',
  // templateUrl: 'recipenote.html',
  templateUrl: 'components/recipenote.html',
  styleUrls: ['components/recipenote.css'],
  directives: [ROUTER_DIRECTIVES], 
  providers: [
    ROUTER_PROVIDERS
  ]
})

// @RouteConfig([
// ])

export class Recipenote {
    title: 'rnote'
}
