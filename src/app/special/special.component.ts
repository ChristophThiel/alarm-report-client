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

  public involved: any[] = [
    {
      name: 'Verletzte Personen',
      isSelected: false,
      value: 0
    },
    {
      name: 'Getötete Personen',
      isSelected: false,
      value: 0
    },
    {
      name: 'Verletzte Tiere',
      isSelected: false,
      value: 0
    },
    {
      name: 'Getötete Tiere',
      isSelected: false,
      value: 0
    },
  ];

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
    this.formGroup.valueChanges.subscribe(_ => {
      this.involved[0].value = this.formGroup.controls['hurtPeople'].value;
      this.involved[1].value = this.formGroup.controls['killedPeople'].value;
      this.involved[2].value = this.formGroup.controls['hurtAnimals'].value;
      this.involved[3].value = this.formGroup.controls['killedAnimals'].value;
      this.alarm.fireOutTime = this.formGroup.controls['fireOut'].value;
    });
    this.alarm.invovled = this.involved;
  }

  public toggle(involved: any): void {
    const index = this.involved.indexOf(involved);
    if (index >= 0) {
      this.involved[index].isSelected = !this.involved[index].isSelected;
    }
  }

  public setWeather(weather: string): void {
    this.alarm.weather = weather;
  }

  public setType(type: string): void {
    this.alarm.alarmType = type;
  }

  public manipulateTime(formControlName: string): void {
    const value = this.formGroup.get(formControlName).value;
    const regex = new RegExp('\\d{4}');
    if (regex.test(value)) {
      this.formGroup.get(formControlName).setValue(value.slice(0, 2) + ':' + value.slice(-2));
    }
  }

}
