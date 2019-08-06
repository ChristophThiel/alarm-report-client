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
  public engagedTime: string = '';
  public firstVehicleTime: string = '';
  public returnLastVehicleTime: string = '';
  public readyTime: string = '';
  public fireOutTime: string = '';

  public weather: string = '';

  public alarmType: string = 'Echtalarm';

  public departments: any[] = [{
    name: 'Marchtrenk',
    isHead: true
  }];
  public organisations: any[];
  public invovled: any[];
  public devices: any[] = [];
  public vehicles: any[] = [
    {
      name: 'Tank 3',
      amount: 15
    },
    {
      name: 'Rüst 2',
      amount: 15
    }
  ];
  public team: any[] = [
    {
      name: 'Christoph Thiel',
      function: 'Einsatzleiter',
      vehicle: 'Rüst 2'
    },
    {
      name: 'Alexander Koblmüller',
      function: 'Maschinist',
      vehicle: 'Tank 3'
    }
  ]
  public protocol: any[] = [];
  public extra: any;
}