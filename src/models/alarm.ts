import { Vehicle } from './vehicle';
import { Device } from './device';
import { TeamMember } from './teamMember';
import { ProtocolEntry } from './protocolEntry';

export class Alarm {

  public alarmKeyword: string;
  public isFireAlarmType: boolean;
  public street: string;
  public parish: string;
  public district: string;
  public start: Date;
  public engaged: Date;
  public firstVehicleAtOperation: Date;
  public alarmStop: Date;
  public operational: Date;
  public end: Date;
  public alarmedBy: any;
  public other: string;
  public organisations: Array<any>;
  public departments: Array<any>;
  public qualityOfDamage: string;
  public occurrences: string;
  public activities: string;
  public temperature: number;
  public weather: string;
  public isPaid: boolean;
  public injuredPeople: Array<any>;
  public rescuedPersonCount: number;
  public securedPersonCount: number;
  public rescuedAnimalCount: number;
  public securedAnimalCount: number;

  public vehicles: Array<Vehicle>;
  public devices: Array<Device>;
  public team: Array<TeamMember>;
  public protocol: Array<ProtocolEntry>;

  public extras: Array<any>;

  constructor() {
    this.isFireAlarmType = true;
    this.start = new Date();
    this.engaged = new Date();
    this.firstVehicleAtOperation = new Date();
    this.alarmStop = new Date();
    this.operational = new Date();
    this.end = new Date();

    this.organisations = new Array();
    this.departments = [{
      name: 'Marchtrenk',
      isHeadOfOperation: true
    }];
    this.injuredPeople = [/*{
      firstname: 'Christoph',
      lastname: 'Thiel',
      isMale: true,
      street: 'Berggasse 4',
      parish: 'Marchtrenk',
      postcode: 4614,
      phoneNumber: '+43 664 3203606',
      email: 'christoph.thiel@liwest.at',
      passedOrganisation: 'Rettung'
    }*/];
    this.vehicles = new Array();
    this.devices = new Array();
    this.team = new Array();
    this.protocol = new Array();
    this.extras = [{

    }];
  }

}

/*import { Vehicle } from "./vehicle";
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

  private _alarmedOver: boolean[];
  private _organisations: boolean[];
  private _departments: any[];

  private _qualityOfDamage: string;
  private _occurrences: string;
  private _activities: string;
  private _temperature: number;
  private _weather: string;
  private _paid: boolean;
  private _countOfRescuedPeople: number;
  private _countOfSecuredPeople: number;
  private _countOfRescuedAnimals: number;
  private _countOfSecuredAnimals: number;

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

    this._alarmedOver = new Array<boolean>(11);
    this._organisations = new Array<boolean>(12);
    this._departments = [{ name: "Marchtrenk", isHeadOfOperation: true }];

    this._qualityOfDamage = "",
      this._occurrences = "";
    this._activities = "";


    this._vehicles = [];
    this._devices = [];
    this._team = [];
    this._protocol = [];
  }

  public get alarmKeyword(): string {
    return this._alarmKeyword;
  }

  public set alarmKeyword(value: string) {
    this._alarmKeyword = value;
  }

  public get isFireAlarmType(): boolean {
    return this._isFireAlarmType;
  }

  public set isFireAlarmType(value: boolean) {
    this._isFireAlarmType = value;
  }

  public get street(): string {
    return this._street;
  }

  public set street(value: string) {
    this._street = value;
  }

  public get parish(): string {
    return this._parish;
  }

  public set parish(value: string) {
    this._parish = value;
  }

  public get district(): string {
    return this._district;
  }

  public set district(value: string) {
    this._district = value;
  }

  public get startTime(): Date {
    return this._startTime;
  }

  public set startTime(value: Date) {
    this._startTime = value;
  }

  public get engagedTime(): Date {
    return this._engagedTime;
  }

  public set engagedTime(value: Date) {
    this._engagedTime = value;
  }

  public get firstVehicleTime(): Date {
    return this._firstVehicleTime;
  }

  public set firstVehicleTime(value: Date) {
    this._firstVehicleTime = value;
  }

  public get alarmStopTime(): Date {
    return this._alarmStopTime;
  }

  public set alarmStopTime(value: Date) {
    this._alarmStopTime = value;
  }

  public get preparednessTime(): Date {
    return this._preparednessTime;
  }

  public set preparednessTime(value: Date) {
    this._preparednessTime = value;
  }

  public get endTime(): Date {
    return this._endTime;
  }

  public set endTime(value: Date) {
    this._endTime = value;
  }

  public get alarmedBy(): Alarmed {
    return this._alarmedBy;
  }

  public set alarmedBy(value: Alarmed) {
    this._alarmedBy = value;
  }

  public get alarmedByOthers(): string {
    return this._alarmedByOthers;
  }

  public set alarmedByOthers(value: string) {
    this._alarmedByOthers = value;
  }

  public get alarmedOver(): boolean[] {
    return this._alarmedOver;
  }

  public get organisations(): boolean[] {
    return this._organisations;
  }

  public get qualityOfDamage(): string {
    return this._qualityOfDamage;
  }

  public set qualityOfDamage(value: string) {
    this._qualityOfDamage = value;
  }

  public get occurrences(): string {
    return this._occurrences;
  }

  public set occurrences(value: string) {
    this._occurrences = value;
  }

  public get activities(): string {
    return this._activities;
  }

  public set activities(value: string) {
    this._activities = value;
  }

  public get temperature(): number {
    return this._temperature;
  }

  public set temperature(value: number) {
    this._temperature = value;
  }

  public get weather(): string {
    return this._weather;
  }

  public set weather(value: string) {
    this._weather = value;
  }

  public get paid(): boolean {
    return this._paid;
  }

  public set paid(value: boolean) {
    this._paid = value;
  }

  public get countOfRescuedPeople(): number {
    return this._countOfRescuedPeople;
  }

  public set countOfRescuedPeople(value: number) {
    this._countOfRescuedPeople = value;
  }

  public get countOfSecuredPeople(): number {
    return this._countOfSecuredPeople;
  }

  public set countOfSecuredPeople(value: number) {
    this._countOfSecuredPeople = value;
  }

  public get countOfRescuedAnimals(): number {
    return this._countOfRescuedAnimals;
  }

  public set countOfRescuedAnimals(value: number) {
    this._countOfRescuedAnimals = value;
  }

  public get countOfSecuredAnimals(): number {
    return this._countOfSecuredAnimals;
  }

  public set countOfSecuredAnimals(value: number) {
    this._countOfSecuredAnimals = value;
  }

  public get vehicles(): Vehicle[] {
    return this._vehicles;
  }

  public set vehicles(value: Vehicle[]) {
    this._vehicles = value;
  }

  public get devices(): Device[] {
    return this._devices;
  }

  public set devices(value: Device[]) {
    this._devices = value;
  }

  public get team(): TeamMember[] {
    return this._team;
  }

  public set team(value: TeamMember[]) {
    this._team = value;
  }

  public get protocol(): ProtocolEntry[] {
    return this._protocol;
  }

  public set protocol(value: ProtocolEntry[]) {
    this._protocol = value;
  }

  public get departments(): any[] {
    return this._departments;
  }

  public set departments(value: any[]) {
    this._departments = value;
  }

  public setAlarmedOver(index: number) {
    this._alarmedOver[index] = !this._alarmedOver[index];
  }

  public setOrganisation(index: number) {
    this._organisations[index] = !this._organisations[index];
  }

}*/
