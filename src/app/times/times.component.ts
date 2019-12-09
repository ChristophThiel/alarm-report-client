import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { ValidatorsService } from '../core/validators.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;

  public years: number[];
  public months: any[];
  public days: number[];

  constructor(private builder: FormBuilder, private validators: ValidatorsService) {
    this.years = [];
    this.months = [];
    this.days = [];
  }

  public ngOnInit(): void {
    const currentDate = new Date();
    this.formGroup = this.builder.group({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDay() + 1,
      alarmed: ['', Validators.required],
      engaged: ['', Validators.required],
      reached: ['', Validators.required],
      stop: ['', Validators.required],
      indented: ['', Validators.required],
      ready: ['', Validators.required]
    });

    for (let i = currentDate.getFullYear() - 1; i <= currentDate.getFullYear() + 1; i++)
      this.years.push(i);
    for (let i = 0; i < 12; i++)
      this.months.push({
        long: new Date(1, i, 1).toLocaleString('default', { month: 'long' }),
        short: i
      });
    this.onValueChanged();
  }

  public createDateTimeValue(formControlName: string): Date {
    const split = this.formGroup.get(formControlName).value.split(':');
    const hour = +split[0];
    const minute = +split[1];

    const year = +this.formGroup.get('year').value
    const month = +this.formGroup.get('month').value
    const day = +this.formGroup.get('day').value;

    if (formControlName === 'alarmed' || this.alarm.alarmed.getHours() <= Reflect.get(this.alarm, formControlName).getHours()) {
      this.onValueChanged();
      return new Date(year, month, day, hour, minute);
    }
    return new Date(year, month, day + 1, hour, minute);
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.formGroup.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    }
  }

  public onValueChanged(): void {
    this.updateDays(+this.formGroup.get('year').value, +this.formGroup.get('month').value);

    const year = +this.formGroup.get('year').value;
    const month = +this.formGroup.get('month').value;

    let day = +this.formGroup.get('day').value;
    this.alarm.startDate = `${year}-${(+month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    this.alarm.alarmed = new Date(year, month, day, this.alarm.alarmed.getHours(), this.alarm.alarmed.getMinutes());

    const fields = Alarm.getTimeFields();
    fields.forEach(field => {
      const fieldValue = Reflect.get(this.alarm, field);
      let result = new Date(year, month, day, fieldValue.getHours(), fieldValue.getMinutes());
      if (this.alarm.alarmed.getHours() > fieldValue.getHours())
        result = new Date(year, month, day + 1, fieldValue.getHours(), fieldValue.getMinutes());
      Reflect.set(this.alarm, field, result);
    });
  }

  private updateDays(year: number, month: number): void {
    this.days = [];
    const daysCount = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysCount; i++)
      this.days.push(i);

    const control = this.formGroup.get('day');
    if (+control.value > daysCount)
      control.setValue(daysCount);
  }

}
