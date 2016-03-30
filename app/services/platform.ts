export module Platform {
    export const BROWSER = 'browser';
    export const ANDROID = 'android';
    export const IOS = 'ios';
    
    export var platform: string;
    var baseURL: string = "";
    
    export function prependBaseURL(url: string): string {
        return getBaseURL() + url;
    }
    
    export function getBaseURL(): string {
        var prefix = "";
        if (getPlatform() != BROWSER) {
            prefix = getPlatform() + "_asset/www/";;
        }
        return prefix;
    }
    
    export function getPlatform(): string {
        // Detect platform name
        if (!platform) {
            platform = (<HTMLMetaElement>document.querySelector("meta[name=platform]")).getAttribute('content');
        }
        return platform;
    }
    
    export function setPlatform(pf: string) {
        platform = pf;
    }
}
