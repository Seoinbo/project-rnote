import {
    Directive,
    ElementRef,
    Output,
    EventEmitter
} from 'angular2/core';
import {Util} from '../../services/util';
import {Config} from '../../services/config';

declare var Slip: any;

@Directive({
    selector: '[slip]'
})
export class SlipSortable {
    @Output() reorder: EventEmitter<any> = new EventEmitter();
    @Output() beforewait: EventEmitter<any> = new EventEmitter();
    
    protected _elementRef: ElementRef;
    protected _element: HTMLElement;
    protected _slip: any;

    public constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._element = elementRef.nativeElement;
    }
    
    public ngAfterViewInit() {
        // init Slip libaray.
        this._slip = new Slip(this._element);
        this._element.addEventListener('slip:beforeswipe', (e: any) => {
            e.preventDefault();
        }, false);
        this._element.addEventListener('slip:beforewait', (e: any) => {
            if (e.target.className.indexOf('mover') > -1
            || e.target.parentNode.className.indexOf('mover') > -1) {
                this.beforewait.next(e);
                e.preventDefault();
            }
        }, false);
        // this._element.addEventListener('slip:beforereorder', (e: any) => {
        //     if (/demo-no-reorder/.test(e.target.className)) {
        //         e.preventDefault();
        //     }
        // }, false);
        this._element.addEventListener('slip:reorder', (e: Event) => {
            this.reorder.next(e);
        }, false);
    }
    
    get slip(): any {
        return this._slip;
    }

    set slip(instance: any) {
        this._slip = instance;
    }
}
