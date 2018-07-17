import { Vehicle } from "./vehicle";
import { Device } from "./device";
import { TeamMember } from "./teamMember";
import { ProtocolEntry } from "./protocolEntry";
import { Alarmed } from "../enums/alarmedBy";

export class Alarm {

    private _alarmKeyword: string;
    private _isFireAlarmType: boolean;
    private _street: string;
    private _parish: string;
    private _district: string;
    private _startTime: Date;
    private _engagedTime: Date;
    private _firstVehicleTime: Date;
    private _alarmStopTime: Date;
    private _preparednessTime: Date;
    private _endTime: Date;
    private _alarmedBy: Alarmed;
    private _alarmedByOthers: string;

    private _vehicles: Vehicle[];
    private _devices: Device[];
    private _team: TeamMember[];
    private _protocol: ProtocolEntry[];

    constructor() { 
        this._alarmKeyword = "";
        this._isFireAlarmType = true;
        this._street = "";
        this._parish = "";
        this._district = "";
        this._startTime = new Date();
        this._engagedTime = new Date();
        this._firstVehicleTime = new Date();
        this._alarmStopTime = new Date();
        this._preparednessTime = new Date();
        this._endTime = new Date();
        this._alarmedBy = Alarmed.BwstLwz;

        this._vehicles = [];
        this._devices = [];
        this._team = [];
        this._protocol = [];
    }

    get alarmKeyword(): string {
        return this._alarmKeyword;
    }

    set alarmKeyword(value: string) {
        this._alarmKeyword = value;
    }

    get isFireAlarmType(): boolean {
        return this._isFireAlarmType;
    }

    set isFireAlarmType(value: boolean) {
        this._isFireAlarmType = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    } 

    get parish(): string {
        return this._parish;
    }

    set parish(value: string) {
        this._parish = value;
    }

    get district(): string {
        return this._district;
    }

    set district(value: string) {
        this._district = value;
    }

    get startTime(): Date {
        return this._startTime;
    }

    set startTime(value: Date) {
        this._startTime = value;
    }

    get engagedTime(): Date {
        return this._engagedTime;
    }

    set engagedTime(value: Date) {
        this._engagedTime = value;
    } 

    get firstVehicleTime(): Date {
        return this._firstVehicleTime;
    }

    set firstVehicleTime(value: Date) {
        this._firstVehicleTime = value;
    } 

    get alarmStopTime(): Date {
        return this._alarmStopTime;
    }

    set alarmStopTime(value: Date) {
        this._alarmStopTime = value;
    } 

    get preparednessTime(): Date {
        return this._preparednessTime;
    }

    set preparednessTime(value: Date) {
        this._preparednessTime = value;
    } 

    get endTime(): Date {
        return this._endTime;
    }

    set endTime(value: Date) {
        this._endTime = value;
    }

    get alarmedBy(): Alarmed {
        return this._alarmedBy;
    }

    set alarmedBy(value: Alarmed) {
        this._alarmedBy = value;
    }

    get alarmedByOthers(): string {
        return this._alarmedByOthers;
    }

    set alarmedByOthers(value: string) {
        this._alarmedByOthers = value;
    }

    get vehicles(): Vehicle[] {
        return this._vehicles;
    }

    set vehicles(value: Vehicle[]) {
        this._vehicles = value;
    }

    get devices(): Device[] {
        return this._devices;
    }

    set devices(value: Device[]) {
        this._devices = value;
    }

    get team(): TeamMember[] {
        return this._team;
    }

    set team(value: TeamMember[]) {
        this._team = value;
    }

    get protocol(): ProtocolEntry[] {
        return this._protocol;
    }

    set protocol(value: ProtocolEntry[]) {
        this._protocol = value;
    }

}