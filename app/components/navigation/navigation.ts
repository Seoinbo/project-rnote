import {Component, ElementRef, HostListener, EventEmitter, Output, Query, QueryList} from 'angular2/core';
import {NavButton} from '../button/nav-button/nav-button';

@Component({
    selector: 'nav',
    templateUrl: 'components/navigation/navigation.html',
    styleUrls: ['components/navigation/navigation.css'],
    directives: [
        NavButton
    ]
})

export class Navigation {
    title: string = "TITLE";
    protected _element: HTMLElement;
    protected _allNavButton: QueryList<NavButton>;

    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    constructor(protected _elementRef: ElementRef, @Query(NavButton) _allNavButton: QueryList<NavButton>) {
        this._element = _elementRef.nativeElement;
        this._allNavButton = _allNavButton;
    }

    ngAfterContentInit() {
        this.initEvent();
    }

    initEvent(): void {
        let elButtons: any = this._element.querySelectorAll('nav-button');
        for (let elButton of elButtons) {
            elButton.addEventListener('btnclick', (e: Event) => {
                console.log(e);
                this.btnClick.emit(e);
            }, true);
        }
    }

    onClick(e: any) {
        console.log('a:', e);
    }
}
