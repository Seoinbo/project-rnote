import {Component, ElementRef} from 'angular2/core';

@Component({
  selector: '.btn-default',
  templateUrl: 'components/button/button.html',
  styleUrls: ['components/button/button.css'],
  inputs: [
      'title'
  ]
})

export class Button {
    title: string = '';
    element: Element;
    elEffect: Element;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }
    
    ngOnInit() {
        this.elEffect = this.element.querySelector('effect');
        this.initEffect();
    }

    protected initEffect() {
        this.element.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.activeEffect();
        }, true);

        this.elEffect.addEventListener("transitionend", () => {
            this.onEffectComplete();
        });
    }

    protected activeEffect() {
        this.elEffect.setAttribute('active-effect', '');
    }

    protected onEffectComplete() {
        this.elEffect.removeAttribute('active-effect');
    }
}
