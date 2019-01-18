import { Component } from '@angular/core';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  public alarms: Array<Alarm>;
  public alarm: Alarm;

  public selectedAlarm: Alarm;

  constructor() {
    this.alarms = new Array();
    this.alarm = new Alarm();
    this.alarm.id = '01-01-18-30';
    this.alarms.push(this.alarm);
    const help = new Alarm();
    help.id = '01-02-12-34';
    this.alarms.push(help);

    this.alarm.instruments = [];
    this.alarm.team = [];
    this.alarm.protocol = [];

    this.selectedAlarm = this.alarm;
  }

  public selectAlarm(selected: Alarm): void {
    this.selectedAlarm = selected;
  }

  public createReport(): void {
    const date = new Date();
    const create = new Alarm();
    create.id = `${date.getMonth() + 1}-${date.getDate()}`;
    this.alarms.push(create);

  }

}
