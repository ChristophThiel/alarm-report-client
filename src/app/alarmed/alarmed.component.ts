import { ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-alarmed',
  templateUrl: './alarmed.component.html',
  styleUrls: ['./alarmed.component.scss']
})
export class AlarmedComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;
  public departments: any[];
  public organisations: any[];

  constructor(private http: HttpClient) {
    this.departments = [];
    this.organisations = [];
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.departments = this.alarm.departments;
    this.http.get<any[]>(environment.organisations)
      .subscribe(data => {
        data.forEach(element => {
          const help = this.alarm.organisations.filter(organisation => organisation.name === element)[0];
          let isSelected = true;
          if (isNullOrUndefined(help))
            isSelected = false;
          this.organisations.push({
            name: element,
            isSelected: isSelected
          });
        })
      });
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
      this.alarm.organisations = this.organisations.filter(organisation => organisation.isSelected);
    }
  }

}
