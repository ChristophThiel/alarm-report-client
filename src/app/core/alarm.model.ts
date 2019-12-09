export class Alarm {
  public id: string = '';
  public isFire: boolean = true;
  public keyword: string = '';
  public location: string = '';
  public parish: string = 'Marchtrenk';
  public postCode: number = 4614;
  public alarmedBy: string = 'LWZ/BWST';
  public others: string = '';
  public damage: string = '';
  public events: string = '';
  public activities: string = '';

  public startDate: string = ''; // yyyy-MM-dd
  public alarmed: Date = new Date();
  public engaged: Date = new Date();
  public reached: Date = new Date();
  public stop: Date = new Date();
  public indented: Date = new Date();
  public ready: Date = new Date();
  public fireOutTime: string = '';

  public weather: string = '';

  public alarmType: string = 'Echtalarm';

  public departments: any[] = [{
    name: 'Marchtrenk',
    isHead: true
  }];
  public organisations: any[] = [];
  public invovled: any[] = [];
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

  public static getTimeFields(): string[] {
    return ['engaged', 'reached', 'stop', 'indented', 'ready'];
  }
}