import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name:'JSON2Array', pure: false})
export class JSON2Array implements PipeTransform {
    transform(objects: any, args:string[]): any {
        return Util.JSON2Array(objects);
    }
}

export module Util {
    export function extractViewChildren(parent: any, arr: Array<any>): void {
        arr.forEach( (list: any) => {
            list.forEach( (item: any) => {
                parent[String.toCamelCase(item.id)] = item;
            });
        });
    }
    
    // 자바스크립트 타임스템프 값을 유닉스 타임스템프 값으로 변환 반환.
    export function toUnixTimestamp(time: number): number {
        return Math.round(time / 1000);
    }
    
    export function JSON2Array(objects: Object) {
        var objectArray: Object[] = [];
        for (let key in objects) {
            let item: any = objects[key];
            item._key = key;
            objectArray.push(item);
        }
        return objectArray;
    }
}

export module String {
    export function trim(str: string): string {
    	return str.replace(/^\s+|\s+$/g, "");
    }
    
    export function toCamelCase(str: string): string {
        return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
    }
    
    export function toDashed(str: string): string {
        return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    }
    
    export function toUnderscore(str: string): string {
    	return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
    }
}
