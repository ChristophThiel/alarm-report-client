export class Alarm {
  public id: string = '';
  public isFire: boolean = true;
  public keyword: string = '';
  public location: string = '';
  public parish: string = 'Marchtrenk';
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
  public fireOut: Date = new Date();

  public weather: string = 'Sonnig';

  public alarmType: string = 'Echtalarm';

  public departments: any[] = [{
    name: 'Marchtrenk',
    isHead: true
  }];
  public organisations: string[] = [];
  public involved: any[] = [];
  public devices: any[] = [];
  public vehicles: string[] = [];
  public team: any[] = []
  public protocol: any[] = [];
  public extra: any;

  public static getTimeFields(): string[] {
    return ['alarmed', 'engaged', 'reached', 'stop', 'indented', 'ready'];
  }
}