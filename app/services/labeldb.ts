import {DB} from './db';
import {ILabel} from './label';

// for IndexedDB
export class LabelDB extends DB {
    constructor() {
        super();
    }
    
    public init() {
        if (this.isOpen()) {
            this.close();
        }
        this.version(LabelDB.VERSION).stores({
            labels: "id"
        });
    }
}
