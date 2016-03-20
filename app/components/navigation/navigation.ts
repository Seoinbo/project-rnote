import {Component, ElementRef, HostListener, EventEmitter, Output, Query, QueryList, ViewChildren} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';
import {Title} from './title/title';

@Component({
    selector: 'nav',
    templateUrl: 'components/navigation/navigation.html',
    styleUrls: ['components/navigation/navigation.css'],
    directives: [
        NavButton,
        Title
    ]
})

export class Navigation {
    title: string = "TITLE";
    protected _element: HTMLElement;
    protected _navButtons: QueryList<NavButton>;
    protected _conNavItems: QueryList<NavButton>;

    @Output() btnClick: EventEmitter<any> = new EventEmitter();
    @ViewChildren(NavButton) protected _navButtons: QueryList<NavButton>;

    constructor(protected _elementRef: ElementRef, @Query(NavButton, {descendants: true}) _conNavItems: QueryList<any>) {
        this._element = _elementRef.nativeElement;
        this._conNavItems = _conNavItems;

        console.log(this._element);
    }

    ngAfterContentInit() {
    }

    ngAfterViewInit() {
        this.initEvent();
    }

    initEvent(): void {
        this._navButtons.toArray().forEach(button => {
            button.btnClick.subscribe( (e) => {
                console.log(e);
            })
            // this.btnClick.emit(['$event']);
        })
    }

    onClick(e: any) {
        console.log('a:', e);
    }
}
