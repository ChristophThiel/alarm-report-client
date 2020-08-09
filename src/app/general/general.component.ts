import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { sortAlhabetical } from '../shared/sort.shared';
import { isNullOrUndefined } from 'util';
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
  public weatherOptions: string[];
  public departments: any[];
  public filteredDepartments: any[];
  public organisations: string[];

  @Input() alarm: Alarm;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.types = environment.types;
    this.alarmTypes = environment.alarmTypes;
    this.alarmedByOptions = environment.alarmedByOptions;
    this.officers = environment.officers
      .sort((a, b) => sortAlhabetical(a, b));
    this.weatherOptions = environment.weatherOptions;
    this.organisations = environment.organisations;
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
      others: [{ value: instance.others, disabled: true }, Validators.required],
      mainActivity: [instance.mainActivity, Validators.required],
      sideActivity: [instance.sideActivity, Validators.required],
      location: [instance.location, Validators.required],
      parish: [instance.parish, Validators.required],
      injuredPeople: [instance.involved[0], Validators.min(0)],
      killedPeople: [instance.involved[1], Validators.min(0)],
      injuredAnimals: [instance.involved[2], Validators.min(0)],
      killedAnimals: [instance.involved[3], Validators.min(0)],
      alarmedDate: [isNullOrUndefined(instance.alarmed) ? new Date() : instance.alarmed],
      alarmed: [isNullOrUndefined(instance.alarmed) ? '' : moment(instance.alarmed).format('hh:mm'), Validators.required],
      engagedDate: [isNullOrUndefined(instance.engaged) ? new Date() : instance.engaged],
      engaged: [isNullOrUndefined(instance.engaged) ? '' : moment(instance.engaged).format('hh:mm')],
      reachedDate: [isNullOrUndefined(instance.reached) ? new Date() : instance.reached],
      reached: [isNullOrUndefined(instance.reached) ? '' : moment(instance.reached).format('hh:mm')],
      stopDate: [isNullOrUndefined(instance.stop) ? new Date() : instance.stop],
      stop: [isNullOrUndefined(instance.stop) ? '' : moment(instance.stop).format('hh:mm')],
      indentedDate: [isNullOrUndefined(instance.indented) ? new Date() : instance.indented],
      indented: [isNullOrUndefined(instance.indented) ? '' : moment(instance.indented).format('hh:mm')],
      readyDate: [isNullOrUndefined(instance.ready) ? new Date() : instance.ready],
      ready: [isNullOrUndefined(instance.ready) ? '' : moment(instance.ready).format('hh:mm')],
      fireOutDate: [isNullOrUndefined(instance.fireOut) ? new Date() : instance.fireOut],
      fireOut: [isNullOrUndefined(instance.fireOut) ? '' : moment(instance.fireOut).format('hh:mm')],
      department: [''],
      organisation: [''],
      damage: [instance.damage],
      events: [instance.events],
      activities: [instance.activities]
    });
    this.form.get('alarmedDate').valueChanges.subscribe(value => {
      const time = this.form.get('alarmed').value;
      if (time.length === 0)
        return;

      this.createAlarmId();
    });
    this.form.get('alarmed').valueChanges.subscribe(value => {
      if (value.length === 0)
        return;

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
    console.log('TESt')

    const control = this.form.get('organisation');
    this.organisations.splice(this.organisations.indexOf(control.value), 1);
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
    this.organisations.push(organisation);
    this.organisations.sort((o1, o2) => sortAlhabetical(o1, o2));
  }

  public setCurrentTime(formControlName: string): void {
    const time = new Date();
    const control = this.form.get(formControlName);
    if (control.value.length === 0)
      control.setValue(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`);
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
    if (control.invalid || isNullOrUndefined(control.value) || control.value.length === 0)
      return false;
    return true;
  }
}