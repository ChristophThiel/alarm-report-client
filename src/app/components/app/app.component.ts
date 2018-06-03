import { Component, OnInit } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { RestService } from '../../services/rest.service';

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

    this.alarms = [];
  }

  public generatePdf(): void {
    this.rest.generatePdf(this.currentAlarm);
  }

}
