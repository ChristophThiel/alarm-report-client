export class Device {

    public name: string;
    public count: number;
    public unit: Unit;

    constructor(name: string, count: number, unit: Unit) {
        this.name = name;
        this.count = count;
        this.unit = unit;
    }
}

export enum Unit { 
    Stück = 0,
    Sack
}