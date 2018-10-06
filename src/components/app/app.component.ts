import { Component } from '@angular/core';
import { Alarm } from '../../models/alarm';

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
    this.alarm.instruments = [{
      name: 'Tank 2',
      amount: 10,
      isVehicle: true
    },
    {
      name: 'Schaufel',
      amount: 2,
      isVehicle: false
    }];
    this.alarm.team = [{
      firstname: 'Christoph',
      lastname: 'Thiel',
      vehicle: '',
      function: 'F'
    }];
    /*this.alarm.alarmKeyword = 'Türöffnung';
    this.alarm.isFireAlarmType = false;
    this.alarm.street = 'Berggasse 4';
    this.alarm.parish = 'Marchtrenk';
    this.alarm.district = 'Wels-Land';*/
  }

}
