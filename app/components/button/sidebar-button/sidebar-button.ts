import {Component, ElementRef} from 'angular2/core';
import {Platform} from '../../../services/platform';
import {Button} from '../button';
import {ClickEffect} from '../click-effect/click-effect';

@Component({
    selector: 'sidebar-button',
    templateUrl: Platform.prependBaseURL('components/button/sidebar-button/sidebar-button.html'),
    styleUrls: [
        Platform.prependBaseURL('components/button/button.css'),
        Platform.prependBaseURL('components/button/sidebar-button/sidebar-button.css')
    ],
    directives: [
        ClickEffect
    ]
})

export class SidebarButton extends Button {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
