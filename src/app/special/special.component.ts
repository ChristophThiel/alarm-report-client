import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Alarm } from '../core/alarm.model';

@Component({
  selector: 'app-special',
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
    'Täuschungsalarm',
    'Böswilliger Alarm'
  ]

  constructor(private builder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.builder.group({
      hurtPeople: ['', Validators.min(0)],
      killedPeople: ['', Validators.min(0)],
      hurtAnimals: ['', Validators.min(0)],
      killedAnimals: ['', Validators.min(0)],
      fireOut: ['']
    });
  }

  public createDateTimeValue(formControlName: string): Date {
    const split = this.form.get(formControlName).value.split(':');
    const date = new Date(this.alarm.startDate);
    date.setHours(+split[0]);
    date.setMinutes(+split[1]);

    if (this.alarm.alarmed > date)
      date.setDate(date.getDate() + 1);

    return date;
  }

}
