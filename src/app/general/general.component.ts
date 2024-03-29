import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { sortAlhabetical } from '../shared/sort.shared';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Component({
  selector: 'app-general',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  public form: FormGroup;

  public types: string[];
  public alarmTypes: string[];
  public alarmedByOptions: string[];
  public officers: string[];
  public mainActivities: string[];
  public sideActivities: string[];
  public weatherOptions: string[];
  public departments: any[];
  public filteredDepartments: any[];

  @Input() alarm: Alarm;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.types = environment.types;
    this.alarmTypes = environment.alarmTypes;
    this.alarmedByOptions = environment.alarmedByOptions;
    this.officers = environment.officers
      .sort((a, b) => sortAlhabetical(a, b));
    this.weatherOptions = environment.weatherOptions;
  }

  public ngOnInit(): void {
    this.initForm(this.alarm);
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
        .sort((d1, d2) => sortAlhabetical(d1, d2));
    }
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.form.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    } else if (control.hasError('invalidKeyword')) {
      return 'Ungültiges Einsatzstichwort';
    }
  }

  public initForm(instance: Alarm): void {
    this.form = this.builder.group({
      others: [{ value: instance.others, disabled: instance.alarmedBy === 'LWZ/BWST' }, Validators.required],
      reason: [instance.reason, Validators.required],
      location: [instance.location, Validators.required],
      parish: [instance.parish, Validators.required],
      injuredPeople: [instance.involved[0], Validators.min(1)],
      killedPeople: [instance.involved[1], Validators.min(1)],
      injuredAnimals: [instance.involved[2], Validators.min(1)],
      killedAnimals: [instance.involved[3], Validators.min(1)],
      // chargeable: [instance.isChargeable],
      // costs: [instance.costs, Validators.min(0)],
      alarmed: [instance.alarmed == null ? '' : moment(instance.alarmed).format('HH:mm'), Validators.required],
      alarmedDate: [instance.alarmed === null || instance.alarmed, Validators.required],
      engaged: [instance.engaged == null ? '' : moment(instance.engaged).format('HH:mm')],
      engagedDate: [instance.engaged === null || instance.engaged],
      reached: [instance.reached == null ? '' : moment(instance.reached).format('HH:mm')],
      reachedDate: [instance.reached === null || instance.reached],
      stop: [instance.stop == null ? '' : moment(instance.stop).format('HH:mm')],
      stopDate: [instance.stop === null || instance.stop],
      indented: [instance.indented == null ? '' : moment(instance.indented).format('HH:mm')],
      indentedDate: [instance.indented === null || instance.indented],
      ready: [instance.ready == null ? '' : moment(instance.ready).format('HH:mm'), Validators.required],
      readyDate: [instance.ready === null || instance.ready, Validators.required],
      fireOut: [{ value: instance.fireOut == null ? '' : moment(instance.fireOut).format('HH:mm'), disabled: instance.alarmType !== 'Realbrand' }, Validators.required],
      fireOutDate: [{ value: instance.fireOut === null || instance.fireOut, disabled: instance.alarmType !== 'Realbrand' }, Validators.required],
      department: [''],
      organisation: [''],
      damage: [instance.damage],
      events: [instance.events],
      problems: [instance.problems]
    });
    this.form.get('alarmedDate').valueChanges.subscribe(_ => {
      this.createAlarmId();
    });
    this.form.get('alarmed').valueChanges.subscribe(_ => {
      this.createAlarmId();
    })
    this.form.valueChanges.subscribe(() => this.onValueChanged());
  }

  public onAlarmedChanged(event: any): void {
    const others = this.form.get('others');
    this.alarm.alarmedBy = event.value;

    if (this.alarm.alarmedBy === environment.alarmedByOptions[0]) {
      others.disable();
    } else {
      others.enable();
    }
  }

  public onAlarmTypeChanged(event: any): void {
    this.alarm.alarmType = event.value;
    const fireOutDate = this.form.get('fireOutDate');
    const fireOut = this.form.get('fireOut');

    if (this.alarm.alarmType === 'Realbrand') {
      fireOutDate.enable();
      fireOut.enable();
    } else {
      fireOutDate.disable();
      fireOut.disable();
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
    this.alarm.organisations.push(control.value);
    control.reset();
  }

  public removeDepartment(department: any): void {
    if (department.isHead)
      this.alarm.departments[0].isHead = true;
    this.alarm.departments.splice(this.alarm.departments.indexOf(department), 1);
  }

  public removeOrganisation(organisation: string): void {
    this.alarm.organisations.splice(this.alarm.organisations.indexOf(organisation), 1);
  }

  public setCurrentTime(formControlName: string): void {
    const now = moment();
    const time = this.form.get(formControlName);
    const date = this.form.get(`${formControlName}Date`);
    if (time.value.length === 0)
      time.setValue(moment().format('HH:mm'));
    if (!date.value)
      date.setValue(now.toDate());
  }

  public select(department: any): void {
    if (department.isHead)
      return;

    this.alarm.departments.forEach(item => item.isHead = false);
    department.isHead = true;
  }

  private createAlarmId(): void {
    const date = moment(this.form.get('alarmedDate').value);
    const split = this.form.get('alarmed').value.split(':');

    if (!date.isValid() || split.length !== 2)
      return;

    this.alarm.id = `${date.format('MM-DD')}-${split[0]}-${split[1]}`;
  }

  private onValueChanged(): void {
    for (let name of Alarm.getTimeFields()) {
      const timeControl = this.form.get(name);
      if (timeControl.value.length === 0) {
        Reflect.set(this.alarm, name, null);
        continue;
      }

      const split = timeControl.value.split(':');
      const date = moment(this.form.get(`${name}Date`).value);

      Reflect.set(this.alarm, name, new Date(date.year(), date.month(), date.date(), +split[0], +split[1]));
    }
  }

  private validateSubmit(formControlName: string): boolean {
    const control = this.form.get(formControlName);
    if (control.invalid || control.value === null || control.value.length === 0)
      return false;
    return true;
  }

}