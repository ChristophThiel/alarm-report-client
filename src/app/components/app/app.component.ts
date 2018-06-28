import { Component, OnInit } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { RestService } from '../../services/rest.service';
import { Device } from '../../models/device';
import { DeviceUnit } from '../../enums/deviceUnit';
import { Vehicle } from '../../models/vehicle';
import { TeamMember } from '../../models/teamMember';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestService]
})
export class AppComponent {
  
  public currentAlarm: Alarm;
  public alarms: string[];

  constructor(private rest: RestService) { 
    this.currentAlarm = new Alarm();
    this.currentAlarm.alarmKeyword = "Türöffnung";
    this.currentAlarm.street = "Berggasse 4";
    this.currentAlarm.devices = [new Device("Besen", 2, DeviceUnit.Item)];
    this.currentAlarm.vehicles = [new Vehicle("Tank 3")];
    this.currentAlarm.team = [new TeamMember("Thiel", "Christoph", "Tank 3", "Mann")];

    this.alarms = [];
  }

  public generatePdf(): void {
    this.rest.generatePdf(this.currentAlarm);
  }

}
