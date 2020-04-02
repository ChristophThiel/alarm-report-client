import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
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

  public organisations: string[];

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.departments = [];
    this.organisations = environment.organisations.sort((o1, o2) => {
      if (o1 > o2)
        return 1;
      if (o1 < o2)
        return -1;
      return 0;
    });;
  }

  public ngOnInit(): void {
    this.form = this.builder.group({
      organisation: [''],
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
        .filter(department => department.toLowerCase().startsWith(value.toLowerCase()))
        .sort((d1, d2) => {
          if (d1 > d2)
            return 1;
          if (d1 < d2)
            return -1;
          return 0;
        });
    }
  }

  public onSubmitDepartment(): void {
    if (!this.validateSubmit('department'))
      return;

    const control = this.form.get('department');
    if (this.alarm.departments.filter(department => department.name === control.value).length !== 0)
      return;

    this.alarm.departments.push({
      name: control.value,
      isHead: false
    });
    control.reset();
    this.filteredDepartments = [];
  }

  public onSubmitOrganisation(): void {
    if (!this.validateSubmit('organisation'))
      return;

    const control = this.form.get('organisation');
    this.organisations.splice(this.organisations.indexOf(control.value), 1);
    this.alarm.organisations.push(control.value);
    control.reset();
  }

  public select(department: any): void {
    if (department.isHead)
      return;

    this.alarm.departments.forEach(item => item.isHead = false);
    department.isHead = true;
  }

  public removeDepartment(department: any): void {
    if (department.isHead)
      this.alarm.departments[0].isHead = true;
    this.alarm.departments.splice(this.alarm.departments.indexOf(department), 1);
  }

  public removeOrganisation(organisation: string): void {
    this.alarm.organisations.splice(this.alarm.organisations.indexOf(organisation), 1);
    this.organisations.push(organisation);
    this.organisations.sort((o1, o2) => {
      if (o1 > o2)
        return 1;
      if (o1 < o2)
        return -1;
      return 0;
    });
  }

  private validateSubmit(formControlName: string): boolean {
    const control = this.form.get(formControlName);
    if (control.invalid || isNullOrUndefined(control.value) || control.value.length === 0)
      return false;
    return true;
  }

}
