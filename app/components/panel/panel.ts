import {Directive, ElementRef} from 'angular2/core';

// ibroller namespace.
declare var ibr: any;

@Directive({
  selector: 'panel'
})
export class Panel {
    protected _element: HTMLElement;

    constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }

    get element(): HTMLElement {
        return this._element;
    }
}

@Directive({
  selector: 'multi-panel'
})
export class MultiPanel {
    protected _element: HTMLElement;
    public ibr: any;

    public constructor(_elementRef: ElementRef) {
        this._element = _elementRef.nativeElement;
    }
    
    public ngAfterViewInit() {
        let args = {
            "wrap": this._element,
            "mask": "panel-mask",
            "group": {
                "element": "panel-group",
                "count": 1
            },
            "unit": "panel",
            "startIndex": 0,
            "play": {
                "auto": false,
                "direction": ibr.dir.ver,
                "moveto": ibr.move.up,
                "intervalTime": 2000,
                "movingCnt": 1
            },
            "events": {
                "init": (index: number) => {},
                "focus": (index: number) => {},
                "play": (index: number) => {},
                "pause": (index: number) => {},
                "timeout": (t: number) => {}
            }
        };
        this.ibr = new ibr(args);
    }

    get element(): HTMLElement {
        return this._element;
    }
}
