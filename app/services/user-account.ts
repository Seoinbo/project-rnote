import {Injectable} from 'angular2/core';
import Dexie from 'dexie';

export interface User {
    id: string
}

@Injectable()
export class UserAccount {
    private _user: User;
    
    get user():User {
        return this._user;
    }
    
    set user(u: User) {
        this._user = $.extend(this._user, u);
    }
}
