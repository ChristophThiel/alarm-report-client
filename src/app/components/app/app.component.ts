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

  constructor(private _rest: RestService) { 
    this.currentAlarm = new Alarm();
  }

  public generatePdf(): void {
    this._rest.generatePdf(this.currentAlarm);
  }

}
