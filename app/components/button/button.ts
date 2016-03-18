import {Component, ElementRef, HostListener, Input} from 'angular2/core';

@Component({
  selector: '.btn-default',
  templateUrl: 'components/button/button.html',
  styleUrls: ['components/button/button.css']
})

export class Button {
    @Input() title: string = '';
    
    protected animating: boolean = false;
    protected _element: HTMLElement;
    
    @HostListener('mousedown', ['$event.target'])
    onMouseDown (btn: any) {
        this.fireEffect();
        // console.log(btn);
    }

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
    
    ngOnInit() {
        this.initEffect();
    }

    fireEffect () {
        this.animating = true;
    }
    
    protected initEffect() {
        this._element.querySelector('effect').addEventListener("transitionend", () => {
            this.animating = false;
        });
    }
}
