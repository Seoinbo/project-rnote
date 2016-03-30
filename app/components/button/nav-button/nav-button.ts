import {Component, View, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Button} from '../button';
import {ClickEffect} from '../click-effect/click-effect';

@Component({
    selector: 'button[nav], panel button[nav]',
    templateUrl: Platform.prependBaseURL('components/button/nav-button/nav-button.html'),
    styleUrls: [
        Platform.prependBaseURL('components/button/button.css'),
        Platform.prependBaseURL('components/button/nav-button/nav-button.css')
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
