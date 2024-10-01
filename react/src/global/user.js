
export class User {
    static _token = 0;
    static _userName = {};

    static get token() {
        return this._token;
    }

    static set token(value) {
        if (this._token !== value) {
            this._token = value;
        }
    }

    static get userName() {
        return this._userName;
    }

    static set userName(value) {
        if (this._userName !== value) {
            this._userName = value;
        }
    }

}
