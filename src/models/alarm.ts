export class Alarm {

  public id: string;
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

  public instruments: Array<any>;
  public team: Array<any>;
  public protocol: Array<any>;

  public extras: any;

  constructor() {
    this.isFireAlarmType = true;

    this.organisations = [];
    this.departments = [];
    this.injuredPeople = [];
    this.team = new Array();
    this.protocol = new Array();
    this.extras = {
      fireDetectorAlarmType: '',
      fireOut: new Date()
    };
  }

}
