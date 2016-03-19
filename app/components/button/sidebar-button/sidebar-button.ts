import {Component, ElementRef} from 'angular2/core';
import {Button} from '../button';
import {ClickEffect} from '../click-effect/click-effect';

@Component({
    selector: 'sidebar-button',
    templateUrl: 'components/button/sidebar-button/sidebar-button.html',
    styleUrls: [
        'components/button/button.css',
        'components/button/sidebar-button/sidebar-button.css'
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
