import {Component, ElementRef, HostListener, EventEmitter, Output, Query, QueryList, ViewChildren} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';
import {Title} from './title/title';
import {Panel} from '../../directives/panel/panel';

@Component({
    selector: 'nav',
    templateUrl: 'components/navigation/navigation.html',
    styleUrls: ['components/navigation/navigation.css'],
    directives: [
        Panel,
        NavButton,
        Title
    ]
})

export class Navigation {
    title: string = "TITLE";
    protected _element: HTMLElement;
    protected _conPanels: QueryList<Panel>;

    @Output() btnClick: EventEmitter<any> = new EventEmitter();
    @ViewChildren(NavButton) protected _navButtons: QueryList<NavButton>;

    constructor(protected _elementRef: ElementRef, @Query(Panel) _conPanels: QueryList<Panel>) {
        this._element = _elementRef.nativeElement;
        this._conPanels = _conPanels;
    }

    ngAfterContentInit() {
        window.setTimeout( () => {
            console.log(this._conPanels);
        }, 500);
    }

    ngAfterViewInit() {
        // this.initEvent();
        console.log(this._conPanels);
    }

    // initEvent(): void {
    //     this._navButtons.toArray().forEach(button => {
    //         button.btnClick.subscribe( () => {
    //             console.log(e);
    //         })
    //         // this.btnClick.emit(['$event']);
    //     })
    // }

    onClick(e: any) {
        console.log('a:', e);
    }
}
