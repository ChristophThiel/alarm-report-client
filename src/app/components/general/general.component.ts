import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { AlarmKeyword } from '../../models/alarmKeyword';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { delay } from 'q';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: []
})
export class GeneralComponent implements OnInit {

  @Input() public alarm: Alarm;

  public alarmKeywords: AlarmKeyword;
  public keywords: string[] = [];
  public filteredKeywords: string[] = [];

  constructor(private rest: RestService) { }

  public ngOnInit(): void {
    this.rest.getAlarmKeywords().subscribe(data => { 
      this.alarmKeywords = data;
      this.keywords = data.fireAlarmKeywords.concat(data.technicalAlarmKeywords);
    });
  } 

  public checkAlarmKeyword(): void {
    this.filter()
    this.alarm.isFireAlarmType = this.alarmKeywords.fireAlarmKeywords.indexOf(this.alarm.alarmKeyword) > -1 ? true : false;
  }

  public setDefaultParish(): void {
    if (this.alarm.parish == "") {
      this.alarm.parish = environment.defaultParish;
    }
  }

  public setDefaultDistrict(): void {
    if (this.alarm.district == "") {
      this.alarm.district = environment.defaultDistrict;
    }
  }

  private filter(): void {
    this.filteredKeywords = [];
    this.keywords.forEach(keyword => {
      if (this.alarm.alarmKeyword == "") {
        this.filteredKeywords = this.keywords;
      }
      else if (keyword.toLowerCase().startsWith(this.alarm.alarmKeyword.toLowerCase())) {
        this.filteredKeywords.push(keyword);
      }
    });
  }

}
