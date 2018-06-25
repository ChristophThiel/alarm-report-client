export class TeamMember {

    public lastname: string;
    public firstname: string;
    public vehicle: any;
    public position: string;

    constructor(lastname: string, firstname: string, vehicle: any, position: string) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.vehicle = vehicle;
        this.position = position;
    }

}