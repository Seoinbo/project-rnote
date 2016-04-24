import {Directive, ElementRef} from 'angular2/core';
import {ViewObject} from '../../directives/view-object/view-object';

@Directive({
  selector: 'popup-menu',
  host: {
      '(transitionend)': 'onTransitionEnd()'
  }
})

export class PopupMenu extends ViewObject {
    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    ngAfterViewInit() {
        document.body.addEventListener('mousedown', () => {
            this.inactive();
        });
    }

    private onTransitionEnd() {
        // 에니메이션 끝난 후 엘리먼트 감추기
        if (!this.activation) {
            this.hide();
        }
    }
}
