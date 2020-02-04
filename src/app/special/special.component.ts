import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Alarm } from '../core/alarm.model';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent {

  @Input()
  public alarm: Alarm;

  public formGroup: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      hurtPeople: new FormControl(''),
      killedPeople: new FormControl(''),
      hurtAnimals: new FormControl(''),
      killedAnimals: new FormControl(''),
      fireOut: new FormControl('')
    });
  }

  public setWeather(weather: string): void {
    this.alarm.weather = weather;
  }

  public setType(type: string): void {
    this.alarm.alarmType = type;
  }

}
