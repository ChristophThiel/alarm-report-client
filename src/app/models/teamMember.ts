export class TeamMember {

    private _lastname: string;
    private _firstname: string;
    private _vehicle: any;
    private _position: string;

    constructor(lastname: string, firstname: string, vehicle: any, position: string) {
        this._lastname = lastname;
        this._firstname = firstname;
        this._vehicle = vehicle;
        this._position = position;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public set lastname(value: string) {
        this._lastname = value;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(value: string) {
        this._firstname = value;
    }

    public get vehicle(): any {
        return this._vehicle;
    }

    public set vehicle(value: any) {
        this._vehicle = value;
    }

    public get position(): string {
        return this._position;
    }

    public set position(value: string) {
        this._position = value;
    }

}