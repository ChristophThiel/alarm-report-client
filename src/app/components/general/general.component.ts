import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: []
})
export class GeneralComponent implements OnInit {

  @Input() public alarm: Alarm;

  constructor() { }

  ngOnInit(): void {
    
  }

}
