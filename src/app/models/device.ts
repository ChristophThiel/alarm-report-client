import { Unit } from "../enums/unit";
import { Instrument } from "../interfaces/instrument";

export class Device implements Instrument {

    public name: string;
    public count: number;
    public unit: Unit;

    constructor(name: string, count: number, unit: Unit) {
        this.name = name;
        this.count = count;
        this.unit = unit;
    }

    public display(): string {
        return `${this.count}x ${this.name}`;
    }
}