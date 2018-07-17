import { DeviceUnit } from "../enums/deviceUnit";
import { Instrument } from "../interfaces/instrument";

export class Device implements Instrument {

    private  _name: string;
    private _count: number;
    private _unit: DeviceUnit;

    constructor(name: string, count: number, unit: DeviceUnit) {
        this._name = name;
        this._count = count;
        this._unit = unit;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get count(): number {
        return this._count;
    }

    public set count(value: number) {
        this._count = value;
    }

    public get unit(): DeviceUnit {
        return this._unit;
    }

    public set unit(value: DeviceUnit) {
        this._unit = value;
    }

    public display(): string {
        return `${this.count}x ${this.name}`;
    }
}