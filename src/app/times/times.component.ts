import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alarm } from '../core/alarm.model';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      startDate: new FormControl(this.alarm.startDate, [Validators.required, Validators.pattern('\\d{2}\.\\d{2}\.\\d{4}')]),
      alarmed: new FormControl(this.alarm.alarmedTime, [Validators.required, Validators.pattern('\\d{2}:\\d{2}')]),
      engaged: new FormControl(this.alarm.engagendTime, [Validators.required, Validators.pattern('\\d{2}:\\d{2}')]),
      firstVehicle: new FormControl(this.alarm.firstVehicleTime, [Validators.required, Validators.pattern('\\d{2}:\\d{2}')]),
      returnLastVehicle: new FormControl(this.alarm.returnLastVehicleTime, [Validators.required, Validators.pattern('\\d{2}:\\d{2}')]),
      ready: new FormControl(this.alarm.readyTime, [Validators.required, Validators.pattern('\\d{2}:\\d{2}')])
    }, [invalidTimeValidator('engaged', 'alarmed'), invalidTimeValidator('firstVehicle', 'engaged'), invalidTimeValidator('returnLastVehicle', 'firstVehicle'), invalidTimeValidator('ready', 'returnLastVehicle')]);
    this.formGroup.valueChanges.subscribe(_ => {
      this.alarm.startDate = this.formGroup.controls['startDate'].value;
    });
  }

  public manipulateDate(formControlName: string): void {
    const value = this.formGroup.get(formControlName).value;
    const regex = new RegExp('\\d{4}|\\d{6}');
    if (regex.test(value)) {
      if (value.length == 4) {
        this.formGroup.get(formControlName).setValue(value.slice(0, 2) + '.' + value.slice(-2) + '.' + new Date().getFullYear());
      } else if (value.length == 6) {
        this.formGroup.get(formControlName).setValue(value.slice(0, 2) + '.' + value.slice(2, 4) + '.20' + value.slice(-2));
      }
    }
  }

  public manipulateTime(formControlName: string): void {
    const value = this.formGroup.get(formControlName).value;
    const regex = new RegExp('\\d{4}');
    if (regex.test(value)) {
      this.formGroup.get(formControlName).setValue(value.slice(0, 2) + ':' + value.slice(-2));
    }
  }

}

export function invalidTimeValidator(firstFormControl: string, secondFormControl: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } | null => {
    const regex = new RegExp('\\d{2}:\\d{2}');
    if (!regex.test(group.get(firstFormControl).value) || !group.get(secondFormControl).value) {
      return null;
    }
    const time = group.get(firstFormControl).value.split(':');
    const other = group.get(secondFormControl).value.split(':');

    if (+time[0] <= +other[0] && +time[1] < +other[1]) {
      group.get(firstFormControl).setErrors({ 'invalidTime': true });
    }
    return null;
  };
}
