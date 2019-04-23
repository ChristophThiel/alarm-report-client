import { ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Alarm } from '../core/alarm.model';

@Component({
  selector: 'app-alarmed',
  templateUrl: './alarmed.component.html',
  styleUrls: ['./alarmed.component.scss']
})
export class AlarmedComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;
  public departments: any[];
  public organisations: any[] = [
    {
      name: 'Rotes Kreuz',
      isSelected: false,
    },
    {
      name: 'Polizei',
      isSelected: false,
    },
    {
      name: 'Abschleppdienst',
      isSelected: false,
    },
    {
      name: 'Gemeinde',
      isSelected: false,
    },
    {
      name: 'Behörde',
      isSelected: false,
    },
    {
      name: 'Stromversorger',
      isSelected: false,
    },
    {
      name: 'Gasunternehmen',
      isSelected: false,
    },
    {
      name: 'ÖBB',
      isSelected: false,
    },
    {
      name: 'Straßenmeisterei',
      isSelected: false,
    },
    {
      name: 'Bestatter',
      isSelected: false,
    },
    {
      name: 'AFK',
      isSelected: false,
    },
    {
      name: 'BFK',
      isSelected: false,
    }
  ]

  constructor() { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.departments = this.alarm.departments;
    this.alarm.organisations = this.organisations;
  }


  public add(event: any): void {
    const input = event.input;
    const value = event.value;
    if ((value || '\n').trim()) {
      this.departments.push({ name: value.trim(), isHead: false });
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(department: any) {
    const index = this.departments.indexOf(department);
    if (index >= 0) {
      if (this.departments[index].isHead) {
        this.departments[0].isHead = true;
      }
      this.departments.splice(index, 1);
    }
  }

  public select(department: any) {
    const index = this.departments.indexOf(department);
    if (index >= 0) {
      for (let i = 0; i < this.departments.length; i++) {
        this.departments[i].isHead = false;
      }
      this.departments[index].isHead = true;
    }
  }

  public toggle(organisation: any) {
    const index = this.organisations.indexOf(organisation);
    if (index >= 0) {
      this.organisations[index].isSelected = !this.organisations[index].isSelected;
    }
  }

}
