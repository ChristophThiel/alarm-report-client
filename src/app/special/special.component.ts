import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-special',
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
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent {

  @Input()
  public alarm: Alarm;

  public form: FormGroup;

  public readonly weatherOptions: string[] = [
    'Sonnig',
    'Regen',
    'Bewölkt',
    'Schnee',
    'Sturm',
    'Nebel',
    'Finster'
  ];
  public readonly alarmTypes: string[] = [
    'Echtalarm',
    'Realbrand',
    'Kein Brand',
    'Fehlalarm',
    'Täuschungsalarm',
    'Böswilliger Alarm'
  ];

  constructor(private builder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm(this.alarm);
  }

  public initForm(instance: Alarm): void {
    this.form = this.builder.group({
      hurtPeople: [instance.involved[0], Validators.min(0)],
      killedPeople: [instance.involved[1], Validators.min(0)],
      hurtAnimals: [instance.involved[2], Validators.min(0)],
      killedAnimals: [instance.involved[3], Validators.min(0)],
      fireOutDate: [isNullOrUndefined(instance.fireOut) ? new Date() : instance.fireOut],
      fireOut: [isNullOrUndefined(instance.fireOut) ? '' : moment(instance.fireOut).format('hh:mm')]
    });
    this.form.valueChanges.subscribe(() => this.onValueChanged());
  }

  public setCurrentTime(formControlName: string): void {
    const time = new Date();
    const control = this.form.get(formControlName);
    if (control.value.length === 0)
      control.setValue(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`);
  }

  private onValueChanged(): void {
    const timeControl = this.form.get('fireOut');
    if (timeControl.value.length === 0) {
      this.alarm.fireOut = null;
      return;
    }

    const split = timeControl.value.split(':');
    const date = moment(this.form.get('fireOutDate').value);
    this.alarm.fireOut = new Date(date.year(), date.month(), date.date(), +split[0], +split[1]);
  }
}
