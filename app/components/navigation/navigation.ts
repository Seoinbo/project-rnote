import {Component, ElementRef, HostListener, EventEmitter, Output, Query, QueryList, ViewChildren, Renderer} from 'angular2/core';
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

    constructor(protected _elementRef: ElementRef, private _renderer: Renderer, @Query(Panel) _conPanels: QueryList<Panel>) {
        this._element = _elementRef.nativeElement;
        this._conPanels = _conPanels;
    }

    ngAfterContentInit() {
        this._element.innerHTML = this._conPanels.first.element.outerHTML;
        // this._element.appendChild(this._conPanel._results[0]);
        console.log(this._conPanels);
    }

    ngAfterViewInit() {
        // this.initEvent();


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
