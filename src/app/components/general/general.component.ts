import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { AlarmKeyword } from '../../models/alarmKeyword';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Alarmed } from '../../enums/alarmedBy';

const MONTH_NAMES: string[] = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

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

  public departments = [{ name: "Marchtrenk" }];
  public visible: boolean = true;
  private separatorKeysCodes = [ENTER, COMMA];

  private isOthersSelected: boolean = true;

  constructor(private rest: RestService) { }

  public ngOnInit(): void {
    /*this.rest.getAlarmKeywords().subscribe(data => { 
      this.alarmKeywords = data;
      this.keywords = data.fireAlarmKeywords.concat(data.technicalAlarmKeywords);
    });*/
    this.getDummyAlarmKeywords();
  }

  private checkAlarmKeyword(): void {
    this.filter();
    this.alarm.isFireAlarmType = this.alarmKeywords.fireAlarmKeywords.indexOf(this.alarm.alarmKeyword) > -1 ? true : false;
  }

  private setDefaultParish(): void {
    if (this.alarm.parish == "") {
      this.alarm.parish = environment.defaultParish;
    }
  }

  private setDefaultDistrict(): void {
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

  private add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.departments.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }

  private remove(department: any): void {
    let index = this.departments.indexOf(department);
    if (index >= 0) {
      this.departments.splice(index, 1);
    }
  }

  private format(date: Date): string {
    return `${date.getDate()}. ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }

  private enableOthers(): void {
    this.isOthersSelected = this.alarm.alarmedBy != Alarmed.Andere;
  }

  private getDummyAlarmKeywords() {
    this.alarmKeywords = JSON.parse(`{
      "fireAlarmIdentifier": "Brandmeldealarm",
      "fireAlarmKeywords": [
          "Brandmeldealarm",
          "Brandmeldetaste Gedrückt",
          "Brand Gewerbe, Industrie",
          "Brand Wohnhaus",
          "Brand Landwirtschaftliches Objekt",
          "Brand Gebäude Menschenansammlung",
          "Brandeinsatz",
          "Brand Abfall Container",
          "Brandverdacht",
          "Brand Baum, Flur, Böschung",
          "Brand Kamin",
          "Brand KFZ",
          "Brandeinsatz, Klein",
          "Brand Elektrische Anlagen"
      ],
      "technicalAlarmKeywords": [
          "Verkehrsunfall Aufräumarbeiten",
          "Verkehrsunfall Eingeklemmte Person",
          "Personenrettung",
          "Technischer Einsatz",
          "Übungsalarm",
          "Fahrzeugbergung",
          "Eingeschlossene Person in Lift",
          "Ölspur, Ölaustritt",
          "Technischer Einsatz Klein",
          "Sturmschaden",
          "Tierrettung",
          "Türöffnung",
          "Überflutung",
          "Wasserschaden"
      ]}`);
    this.keywords = this.alarmKeywords.fireAlarmKeywords.concat(this.alarmKeywords.technicalAlarmKeywords);
  }

}
