import {Util} from './util';
import {Config} from './config';
import Dexie from 'dexie';

export interface DBObject {
    import<T>(data: T): void,
    export(): any,
    touch(): void,
    syncIDB(): void
}

// for IndexedDB
export class DB extends Dexie {
    public static VERSION: number = 2;
    public static DB_RNOTE: string = 'rnote';

    constructor() {
        super(DB.DB_RNOTE);
        this.on("error", (e: any) => {
            console.log(e);
        });
    }

    // src - local data
    public __syncIDB(tableName: string, src: any, complete?: Function) {
        if (src instanceof Array === false) {
            src = [src];
        }

        let store = this.table(tableName);
        let length: number = src.length;
        let count: number = 0;
        let res: Array<any> = [];
        for (let i in src) {
            store.get(src[i].id).then( (item) => {
                if (item) {
                    if (src[i].updated > item.updated) {
                        store.put(src[i]).then( () => {
                            res.push(src[i]);
                            Util.lazyApply(++count, length, complete, res);
                        });
                    } else {
                        src[i] = item;
                        res.push(src[i]);
                        Util.lazyApply(++count, length, complete, res);
                    }
                } else {
                    res.push(src[i]);
                    store.add(src[i]).then( () => {
                        Util.lazyApply(++count, length, complete, res);
                    });
                }
            }).catch( (e) => {
                console.log(e);
            });
        }
    }

    public syncIDB(tableName: string, src: any, complete?: Function) {
        window.setTimeout( () => {
            this.__syncIDB(tableName, src, complete);
        }, 0);
    }
}
//
// export class RecipeDBT<T, key> implements Dexie.T {
//
// }
