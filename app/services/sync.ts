export interface SyncSource {
    synctime: number, // 마지막 동기화 시간
    updated: number, // 마지막 데이터 수정 시간
    sources: any
}
export class Sync {
    
    // 둘 중 가장 최신 데이터가 무엇인지 판단.
    public compare (a: SyncSource, b: SyncSource): number {
        if (a.updated > b.updated) {
            return 1;
        } else if (a.updated < b.updated) {
            return -1;
        } else {
            return 0;
        }
    }
    
    public run<T>(src: T, dest: T): T {
        return 
    }
    
    public merge<T> (src: T, dest: T): T {
        return $.extend(dest, src);
    }
}
