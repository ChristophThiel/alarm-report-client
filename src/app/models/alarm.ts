import { Vehicle } from "./vehicle";
import { Device } from "./device";
import { TeamMember } from "./teamMember";
import { ProtocolEntry } from "./protocolEntry";

export class Alarm {

    public alarmKeyword: string;
    public isFireAlarmType: boolean;
    public street: string;
    public parish: string;
    public district: string;
    public vehicles: Vehicle[];
    public devices: Device[];
    public team: TeamMember[];
    public protocol: ProtocolEntry[];

    constructor() { 
        this.alarmKeyword = "";
        this.isFireAlarmType = true;
        this.street = "";
        this.parish = "";
        this.district = "";
    }

}