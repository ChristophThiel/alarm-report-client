export class Alarm {

    private _alarmType: string;

    constructor() { 
        this._alarmType = "";
    }

    public get alarmType() {
        return this._alarmType;
    }

    public set alarmType(value: string) {
        this._alarmType = value;
    }

}