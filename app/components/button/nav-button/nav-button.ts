import {Component, View, ElementRef} from 'angular2/core';
import {Button} from '../button';
import {ClickEffect} from '../click-effect/click-effect';

@Component({
    selector: 'nav-button',
})

@View({
    templateUrl: 'components/button/nav-button/nav-button.html',
    styleUrls: [
        'components/button/button.css',
        'components/button/nav-button/nav-button.css'
    ],
    directives: [
        ClickEffect
    ]
})

export class NavButton extends Button {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
