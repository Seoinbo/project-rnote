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
    private _labels: LinkedList<ILabel>;
    
    constructor () {
        this._db = new LabelDB();
        this._db.init();
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
                updated: Util.toUnixTimestamp(Config.now()),
                removed: false,
                recipes: new LinkedList<string>()
            };
        }
        let label:Label = new Label();
        label.import(data);
        return label;
    }

    public add (label: Label) {
        this.labels.add(label);
    }

    get userid(): string {
        return this._userid;
    }

    set userid(id: string) {
        this._userid = id;
    }
    
    get labels(): LinkedList<ILabel> {
        return this.labels;
    }
    
    set labels(labels: LinkedList<ILabel>) {
        this.labels = labels;
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
    
    public import (data: ILabel): ILabel {
        return $.extend(this, data);
    }
    
    public export (): ILabel {
        return {
            id: this.id,
            owner: this.owner,
            name: this.name,
            updated: this.updated,
            removed: this.removed,
            recipes: this.recipes
        };
    }
    
    // Sync recipes between memory and IndexedDB(localStorage)
    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("labels", this.export(), () => {
                console.log("Complete syncIndexdDB() at Label.");
                this._db.close();
            });
        });
    }
}
