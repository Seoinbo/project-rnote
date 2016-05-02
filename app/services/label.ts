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
    recipes?: Array<string>;
}

// You have to set userid first.
@Injectable()
export class LabelService {
    private _userid: string;
    private _db: LabelDB;
    private _currentLabel: string = "all";
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
                updated: Util.toUnixTimestamp(Config.now()),
                removed: false,
                recipes: []
            };
        }
        let label:Label = new Label();
        label.import(data);
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
    
    get currentLabel(): string {
        return this._currentLabel;
    }
    
    set currentLabel(labelID: string) {
        this._currentLabel  = labelID;
    }
}

export class Label implements ILabel, DBObject {
    private _db: LabelDB;
    public origin: any;

    public id: string;
    public owner: string;
    public name: string;
    public updated: number;
    public removed: boolean = false;
    public recipes: Array<string> = [];

    constructor (labelID?: string) {
        this.id = labelID;
        this._db = new LabelDB();
        this._db.init();
    }

    public inRecipes(recipID: string): boolean {
        if (this.recipes.indexOf(recipID) > -1) {
            return true;
        }
        return false;
    }
        
    public updateOrigin(forceUpdate: boolean = false): any {
        let current: any = this.export();
        if (forceUpdate || !this.origin) {
            this.origin = $.extend(true, {}, current);
        }
        return this.origin;
    }

    public import(data: ILabel): ILabel {
        $.extend(this, data);
        this.updateOrigin();
        return this.export();
    }

    public export(): ILabel {
        return {
            id: this.id,
            owner: this.owner,
            name: this.name,
            updated: this.updated,
            removed: this.removed,
            recipes: this.recipes
        };
    }

    public touch(): Label {
        this.updated = Util.toUnixTimestamp(Config.now());
        return this;
    }
    
    // 'updated' 제외한 속성들이 변했는가?
    public changed(prop?: string): boolean {
        let includes: Array<string>;
        if (prop) {
            includes = [prop];
        }
        return !Util.isEqual(this.origin, this.export(), includes, ['updated']);
    }

    public remove() {
        this.removed = true;
        this.touch();
    }

    // Sync recipes between memory and IndexedDB(localStorage)
    public syncIDB() {
        this._db.open().then( () => {
            this._db.syncIDB("labels", this.export(), (state: string) => {
                console.log("Complete syncIndexdDB() at Label.");
                this.updateOrigin(true);
                this._db.close();
            });
        }).catch( (e) => {
            console.log(e);
        })
    }
}
