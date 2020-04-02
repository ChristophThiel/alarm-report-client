import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-times',
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
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  @Input() alarm: Alarm;

  public times = Alarm.getTimeFields();

  public form: FormGroup;

  constructor(private builder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm(this.alarm);
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.form.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    }
  }

  public initForm(instance: Alarm): void {
    this.form = this.builder.group({
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
      ready: [isNullOrUndefined(instance.ready) ? '' : moment(instance.ready).format('hh:mm')]
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

  public setCurrentTime(formControlName: string): void {
    const time = new Date();
    const control = this.form.get(formControlName);
    if (control.value.length === 0)
      control.setValue(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`);
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

}
