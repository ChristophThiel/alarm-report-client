export class ProtocolEntry {

    private _time: string;
    private _text: string;

    constructor(time: string, text: string) {
        this._time = time;
        this._text = text;
    }

    public get time(): string {
        return this._time;
    }

    public set time(value: string) {
        this._time = value;
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

}