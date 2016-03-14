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
    public title: string = '';
    private element: ElementRef;
    private elButton: any;
    private elEffect: any;

    constructor (element: ElementRef) {
        this.element = element;

    }
    
    ngOnInit() {
        this.elButton = this.element.nativeElement;
        this.elEffect = this.elButton.querySelector('effect');
        this.initEffect();
    }

    protected initEffect() {
        this.elButton.addEventListener('click', (e: Event) => {
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
