import {Injectable} from 'angular2/core';
import {Util} from './util';
import {Config} from './config';
import {LinkedList, ILinkedListNode} from './collections/LinkedList';
import {DBObject} from './db';
import {LabelDB} from './labeldb';

declare var $: any;

export interface ILabel {
    id: string;
    owner: string;
    name: string;
    updated: number;
    removed: boolean;
    recipes?: LinkedList<string>;
}

// You have to set userid first.
@Injectable()
export class LabelService {
    private _userid: string;
    private _db: LabelDB;
    private _labels: LinkedList<Label>;
    
    constructor () {
        this._db = new LabelDB();
        this._db.init();
        this._labels = new LinkedList<Label>();
    }

    public downloadAll (complete?: Function) {
        this._db.open().then( () => {
            this._db.table("labels").each( (item: ILabel) => {
                this.add(this.create(item));
            }).then( () => {
                complete.apply(null);
            });
        }).finally( () => {
            this._db.close();
        });
    }

    public create (data?: ILabel): Label {
        if (!data) {
            data = {
                id: this._userid + '-l' + Util.uniqID(Config.now()),
                owner: this._userid,
                name: 'New label',
                updated: 0,
                removed: false,
                recipes: new LinkedList<string>()
            };
        }
        let label:Label = new Label();
        label.import(data);
        label.touch();
        return label;
    }

    public add(label: Label) {
        this.labels.add(label);
    }
    
    public remove(id: string): boolean {
        let label: Label = this.getLabelByID(id);
        if (label) {
            if (!this.labels.remove(label)) {
                return false;
            }
            label.remove();
            label.syncIDB();
        }
        return true;
    }
    
    public getLabelByID(id: string): Label {
        let retv: Label = null;
        this.labels.forEach( (label: Label) => {
            if (label.id == id) {
                retv = label;
                return false;
            }
        });
        return retv;
    }

    get userid(): string {
        return this._userid;
    }

    set userid(id: string) {
        this._userid = id;
    }
    
    get labels(): LinkedList<Label> {
        return this._labels;
    }
    
    set labels(labels: LinkedList<Label>) {
        this._labels = labels;
    }
}

export class Label implements ILabel, DBObject {
    private _db: LabelDB;
    
    public id: string;
    public owner: string;
    public name: string;
    public updated: number;
    public removed: boolean = false;
    public recipes: LinkedList<string>;
    
    constructor (labelID?: string) {
        this.id = labelID;
        this._db = new LabelDB();
        this._db.init();
    }
    
    public import(data: ILabel): ILabel {
        return $.extend(this, data);
    }
    
    public export(): ILabel {
        return {
            id: this.id,
            owner: this.owner,
            name: this.name,
            updated: this.updated,
            removed: this.removed
            // recipes: this.recipes
        };
    }
    
    public touch() {
        this.updated = Util.toUnixTimestamp(Config.now());
    }
    
    public remove() {
        this.removed = true;
        this.touch();
    }
    
    // Sync recipes between memory and IndexedDB(localStorage)
    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("labels", this.export(), () => {
                console.log("Complete syncIndexdDB() at Label.");
                this._db.close();
            });
        }).catch( (e) => {
            console.log(e);
        })
    }
}
