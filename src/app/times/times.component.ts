import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

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
    this.form = this.builder.group({
      alarmedDate: [new Date()],
      alarmed: ['', Validators.required],
      engagedDate: [new Date()],
      engaged: [''],
      reachedDate: [new Date()],
      reached: [''],
      stopDate: [new Date()],
      stop: [''],
      indentedDate: [new Date()],
      indented: [''],
      readyDate: [new Date()],
      ready: ['']
    });
    this.form.valueChanges.subscribe(() => this.onValueChanged());
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.form.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    }
  }

  public setCurrentTime(formControlName: string): void {
    const time = new Date();
    const control = this.form.get(formControlName);
    if (control.value.length === 0)
      control.setValue(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`);
  }

  private onValueChanged(): void {
    for (let name of Alarm.getTimeFields()) {
      const time = this.form.get(name).value;
      if (time.length === 0)
        continue;

      const split = time.split(':');
      const date = moment(this.form.get(`${name}Date`).value);

      Reflect.set(this.alarm, name, new Date(date.year(), date.month(), date.date(), +split[0], +split[1]));
    }
  }

}
