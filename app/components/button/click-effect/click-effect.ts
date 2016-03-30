import {Component, Directive, ElementRef, Input, HostListener} from 'angular2/core';
import {Platform} from '../../../services/platform';
 
@Component({
  selector: 'click-effect',
  template: '',
  styleUrls: [
      Platform.prependBaseURL('components/button/click-effect/click-effect.css')],
  host: {
      '[attr.animating]': 'animating'
  }
})

export class ClickEffect {
    protected _element: HTMLElement;
    protected animating: boolean = false;
    
    constructor(protected _elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
    
    @HostListener('mousedown', ['$event.target'])
    onMouseDown (btn: any) {
        this.animating = true;
    }
    
    @HostListener('transitionend')
    onTransitionEnd () {
        this.animating = false;
    }
}    
