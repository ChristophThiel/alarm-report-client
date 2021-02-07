export class Alarm {
  public id: string = ''; // 11-31-23-59

  public isFire: boolean = true;
  public alarmType: string = 'Echtalarm';

  public alarmedBy: string = 'LWZ/BWST';
  public others: string = '';

  public reason: string = '';

  public location: string = '';
  public parish: string = 'Marchtrenk';

  public involved: any[4] = [];

  public weather: string = 'Sonnig';

  public alarmed: Date;
  public engaged: Date;
  public reached: Date;
  public stop: Date;
  public indented: Date;
  public ready: Date;
  public fireOut: Date;

  public departments: any[] = [{
    name: 'Marchtrenk',
    isHead: true
  }];
  public organisations: string[] = [];

  public damage: string = '';
  public events: string = '';
  public problems: string = '';

  public devices: any[] = [];
  public vehicles: any[] = [];
  public team: any[] = [];
  public protocol: any[] = [];

  public static getTimeFields(): string[] {
    return ['alarmed', 'engaged', 'reached', 'stop', 'indented', 'ready', 'fireOut'];
  }
}