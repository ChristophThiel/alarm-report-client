export class Alarm {
  public id: string = '';
  public isFire: boolean = false;
  public keyword: string = '';
  public location: string = '';
  public parish: string = 'Marchtrenk';
  public alarmed: string = 'LWZ/BWST';
  public others: string = '';
  public damage: string = '';
  public events: string = '';
  public activities: string = '';

  public startDate: string = '';
  public alarmedTime: string = '';
  public engagendTime: string = '';
  public firstVehicleTime: string = '';
  public returnLastVehicleTime: string = '';
  public readyTime: string = '';

  public alarmType: string;

  public departments: any[] = [{
    name: 'Marchtrenk',
    isHead: true
  }];
  public organisations: any[];
  public devices: any[];
  public vehicles: any[];
  public team: any[];
  public protocol: any[];

  public extra: any;
}