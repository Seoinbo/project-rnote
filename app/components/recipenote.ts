import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {Navigation} from './navigation/navigation';

@Component({
    selector: 'app',
    // templateUrl: 'recipenote.html',
    templateUrl: 'components/recipenote.html',
    styleUrls: ['components/recipenote.css'],
    directives: [
        ROUTER_DIRECTIVES,
        Navigation
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})

// @RouteConfig([
// ])

export class Recipenote {
    title: 'rnote'
}
