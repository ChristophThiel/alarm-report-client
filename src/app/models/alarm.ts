export class Alarm {

    public alarmKeyword: string;
    public isFireAlarmType: boolean;
    public street: string;
    public parish: string;
    public district: string;

    constructor() { 
        this.alarmKeyword = "";
        this.isFireAlarmType = true;
        this.street = "";
        this.parish = "";
        this.district = "";
    }

}