import { DeviceUnit } from "../enums/deviceUnit";
import { Instrument } from "../interfaces/instrument";

export class Device implements Instrument {

    public name: string;
    public count: number;
    public unit: DeviceUnit;

    constructor(name: string, count: number, unit: DeviceUnit) {
        this.name = name;
        this.count = count;
        this.unit = unit;
    }

    public display(): string {
        return `${this.count}x ${this.name}`;
    }
}