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
    public startTime: Date;
    public engagedTime: Date;
    public firstVehicleTime: Date;
    public alarmStopTime: Date;
    public preparednessTime: Date;
    public endTime: Date;

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
        this.startTime = new Date();
        this.engagedTime = new Date();
        this.firstVehicleTime = new Date();
        this.alarmStopTime = new Date();
        this.preparednessTime = new Date();
        this.endTime = new Date();

        this.vehicles = [];
        this.devices = [];
        this.team = [];
        this.protocol = [];
    }

}