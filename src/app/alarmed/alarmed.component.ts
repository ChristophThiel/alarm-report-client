import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
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

  public form: FormGroup;

  public departments: any[];
  public filteredDepartments: any[];

  public readonly organisations: string[];

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.departments = [];
    this.organisations = environment.organisations;
  }

  public ngOnInit(): void {
    this.form = this.builder.group({
      department: ['']
    });
    this.http.get<string[]>(environment.departments)
      .subscribe(data => this.departments = data);
  }

  public filter(): void {
    const value = this.form.get('department').value;
    if (value.length === 0)
      this.filteredDepartments = [];
    else {
      const help = this.alarm.departments.map(department => department.name);
      this.filteredDepartments = this.departments.filter(department => help.indexOf(department) === -1)
        .filter(department => department.toLowerCase().startsWith(value.toLowerCase()));
    }
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    const value = this.form.get('department').value;
    if (isNullOrUndefined(value))
      return;
    if (value.length === 0 || this.alarm.departments.filter(department => department.name === value).length !== 0)
      return;

    this.alarm.departments.push({
      name: value,
      isHead: false
    });
    this.form.reset();
    this.filteredDepartments = [];
  }

  public select(department: any): void {
    if (department.isHead)
      return;

    this.alarm.departments.forEach(item => item.isHead = false);
    department.isHead = true;
  }

  public remove(department: any): void {
    if (department.isHead)
      this.alarm.departments[0].isHead = true;
    this.alarm.departments.splice(this.alarm.departments.indexOf(department), 1);
  }

  /* public add(event: any): void {
    const input = event.input;
    const value = event.value;
    if ((value || '\n').trim()) {
      this.selectedDepartments.push({ name: value.trim(), isHead: false });
    }
    if (input) {
      input.value = '';
    }
  }

  public onOptionSelected(event: any): void {
    console.log(event.option.viewValue)
    this.selectedDepartments.push({
      name: event.option.viewValue,
      isHead: false
    });
  }

  public onValueChanged(): void {
    const value = this.control.value;
    if (value.length === 0)
      return;

    this.filteredDepartments = this.departments.filter(department => this.selectedDepartments.indexOf(selected => selected.name === department))
      .filter(department => department.startsWith(value));
  }

  public remove(department: any): void {
    if (department.name === 'Marchtrenk')
      return;

    const index = this.selectedDepartments.indexOf(department);
    if (index >= 0) {
      if (this.selectedDepartments[index].isHead) {
        this.selectedDepartments[0].isHead = true;
      }
      this.selectedDepartments.splice(index, 1);
    }
  }

  public select(department: any) {
    console.log(this.selectedDepartments);
    const index = this.selectedDepartments.indexOf(department);
    if (index >= 0) {
      this.selectedDepartments.forEach(department => department.isHead = false);
      this.selectedDepartments[index].isHead = true;
    }
  } */

}
