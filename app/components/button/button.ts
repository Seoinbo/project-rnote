import {
    Component,
    ElementRef,
    Input,
    ViewChild,
    HostListener
} from 'angular2/core';

@Component({
  selector: '.btn-default',
  templateUrl: 'components/button/button.html',
  styleUrls: ['components/button/button.css']
})

export class Button {
    @Input() title: string = '';
    protected animating: boolean = false;
    protected element: HTMLElement;
    
    @HostListener('mousedown', ['$event.target'])
    onMouseDown (btn: any) {
        // console.log(btn);
        this.fireEffect();
    }

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }
    
    ngOnInit() {
        this.initEffect();
    }

    fireEffect () {
        this.animating = true;
    }
    
    protected initEffect() {
        this.element.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.animating = true;
        }, true);

        this.element.querySelector('effect').addEventListener("transitionend", () => {
            this.animating = false;
        });
    }
}
