import { Instrument } from "../interfaces/instrument";

export class Vehicle implements Instrument {

    public name: string;
    public count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }

    public display(): string {
        return this.name;
    }

}