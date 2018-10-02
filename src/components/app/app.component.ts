import { Component } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { Device } from '../../models/device';
import { DeviceUnit } from '../../enums/deviceUnit';
import { Vehicle } from '../../models/vehicle';
import { TeamMember } from '../../models/teamMember';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  public alarms: Array<string>;
  public alarm: Alarm;

  constructor() {
    this.alarms = new Array();

    this.alarm = new Alarm();
    this.alarm.alarmKeyword = 'Türöffnung';
    this.alarm.isFireAlarmType = false;
    this.alarm.street = 'Berggasse 4';
    this.alarm.parish = 'Marchtrenk';
    this.alarm.district = 'Wels-Land';
  }
  /* this.currentAlarm = new Alarm();
  this.currentAlarm.alarmKeyword = 'Türöffnung';
  this.currentAlarm.street = 'Berggasse 4';
  this.currentAlarm.devices = [new Device("Besen", 2, DeviceUnit.Item)];
  this.currentAlarm.vehicles = [new Vehicle("Tank 3", 20)];
  this.currentAlarm.team = [new TeamMember("Thiel", "Christoph", "Tank 3", "Mann")];
  this.currentAlarm.startTime = new Date(2018, 4, 8);

  this.alarms = []; */

}
