import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { AlarmKeyword } from '../../models/alarmKeyword';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { Alarmed } from '../../enums/alarmedBy';

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

  private separatorKeysCodes = [ENTER];
  private isOthersSelected: boolean;

  constructor() { }

  public ngOnInit() { }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.alarm.departments.push({
        name: value.trim(),
        isHeadOfOperation: false
      });
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(department: any): void {
    const index = this.alarm.departments.indexOf(department);
    if (index >= 0) {
      const removed = this.alarm.departments.splice(index, 1);
      if (removed[0].isHeadOfOperation) {
        this.setHeadOfOperation(this.alarm.departments[0]);
      }
    }
  }

  public setHeadOfOperation(department: any): void {
    this.alarm.departments.forEach(element => {
      if (element.name === department.name) {
        element.isHeadOfOperation = true;
      } else {
        element.isHeadOfOperation = false;
      }
    });
  }

  public selectOrganisation(organisation: any): void {
    this.alarm.organisations.forEach(element => {
      if (element.name === organisation.name) {
        element.isSelected = !element.isSelected;
      }
    });
  }

  public enableOthers(): void {
    this.isOthersSelected = this.alarm.alarmedBy !== Alarmed.Andere;
  }

}
