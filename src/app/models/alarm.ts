export class Alarm {

    private _alarmKeyword: string;

    constructor() { 
        this._alarmKeyword = "";
    }

    public get alarmKeyword() {
        return this._alarmKeyword;
    }

    public set alarmKeyword(value: string) {
        this._alarmKeyword = value;
    }

}