import { Component, OnInit } from '@angular/core';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  currentAlarm = "Test";

  constructor() { }

}
