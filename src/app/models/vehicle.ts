import { Instrument } from "../interfaces/instrument";

export class Vehicle implements Instrument {

    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public display(): string {
        return this.name;
    }

}