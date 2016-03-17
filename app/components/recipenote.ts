import {
    Component, 
    Query, 
    QueryList,
    ElementRef,
    ViewChild,
    HostListener
} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Navigation} from './navigation/navigation';
import {Sidebar} from './sidebar/sidebar';

@Component({
    selector: 'app',
    // templateUrl: 'recipenote.html',
    templateUrl: 'components/recipenote.html',
    styleUrls: ['components/recipenote.css'],
    directives: [
        ROUTER_DIRECTIVES,
        Navigation,
        Sidebar
    ],
    providers: [
        ROUTER_PROVIDERS,
        Sidebar
    ]
})

// @RouteConfig([
// ])

export class Recipenote {
    element: Element;
    title: 'rnote'

    // constructor(elementRef: ElementRef) {
    //     this.element = elementRef.nativeElement;
    // }
    
    @HostListener('onchangedisplay', ['$event.target'])
    onMouseDown (btn: any) {
        // console.log(btn);
        console.log("bbbb");
    }
    
    constructor(sidebar: Sidebar) {
    }
    
    ngOnInit() {
        // @Query("side") items: QueryList<ElementRef>;
    }

    showCloseArea(): void {
        // this.element.querySelector('.sidebar-close').setAttribute('active', 'on');
    }

    hideCloseArea(): void {
        // this.element.querySelector('.sidebar-close').setAttribute('active', 'off');
    }
    
    activeSidebar(value: boolean): void {
        console.log(value);
    }
}
