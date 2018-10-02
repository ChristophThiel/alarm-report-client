import { Instrument } from "../interfaces/instrument";

export class Vehicle implements Instrument {

    private _name: string;
    private _count: number;

    constructor(name: string, count: number) {
        this._name = name;
        this._count = count;
    }

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value;
    }

    public get count(): number {
        return this._count
    }

    public set count(value: number) {
        this._count = value;
    }

    public display(): string {
        return this.name;
    }

}