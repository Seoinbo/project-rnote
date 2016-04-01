export module Util {
    export function extractViewChildren(parent: any, arr: Array<any>): void {
        arr.forEach( (list: any) => {
            list.forEach( (item: any) => {
                parent[String.toCamelCase(item.id)] = item;
            });
        });
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
