export class Alerted {

    private _name: string;
    private _time: string;

    constructor() { 
        this._name = "";
        this._time = "";
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get time(): string {
        return this._time;
    }

    public set time(value: string) {
        this._time = value;
    }

}