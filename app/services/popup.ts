import {Injectable, ComponentRef, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Util, String} from './util';
import {Config} from './config';

import {PopupLabels} from '../components/popup-window/popup-labels/popup-labels';

@Injectable()
export class PopupService {
    // popup-windows for cache. <ComponentRef>
    private _popupCRefList = {};
    private _container: ElementRef;
    
    public constructor(
        private _dcl: DynamicComponentLoader
    ) {
        
    }
    
    public setViewContainer(container: ElementRef) {
        this._container = container;
    }
    
    public load(component: any, complete?: Function) {
        let type: string = String.getFunctionName(component.toString());
        if (this._popupCRefList[type] === undefined) {
            this._dcl.loadIntoLocation(component, this._container, 'popupWindowHead').then( (cref: ComponentRef) => {
                this._popupCRefList[type] = cref;
                window.setTimeout( () => {
                    if (complete) {
                        complete.apply(null, [cref.instance]);
                    }
                }, 0);
            });
        } else {
            if (complete) {
                complete.apply(null, [this._popupCRefList[type].instance]);
            }
        }
    }
    
    public openLabel(recipeID?: string) {
        this.load(PopupLabels, (instance: PopupLabels) => {
            if (recipeID) {
                instance.select(recipeID);
            } else {
                instance.view();
            }
        });
    }
}
