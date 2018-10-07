import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric'
};

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css']
})
export class TimeInputComponent implements OnInit {

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public dateTime?: Date;
  @Input() public customFormControl?: FormControl;
  @Input() public disableValueChange: boolean;
  @Output() public dateTimeChange = new EventEmitter();

  public timeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-2][0-9]\:[0-5][0-9]$'),
  ]);

  public time: string;

  constructor() {
    this.placeholder = new Date().toLocaleTimeString('de-DE', timeOptions);
  }

  public ngOnInit(): void {
    if (!isNullOrUndefined(this.customFormControl)) {
      this.timeFormControl = this.customFormControl;
    }
    if (isNullOrUndefined(this.dateTime)) {
      this.dateTime = new Date();
    } else {
      this.time = this.dateTime.toLocaleTimeString('de-DE', timeOptions);
    }
  }

  public formatDate(): string {
    return this.dateTime.toLocaleDateString('de-DE', dateOptions);
  }

  public onValueChange(): void {
    if (!this.timeFormControl.invalid && !this.disableValueChange) {
      const values = this.time.split(':');
      if (+values[0] <= 23 && +values[1] <= 59) {
        this.dateTime.setHours(+values[0], +values[1]);
      } else {
        this.timeFormControl.setErrors({ incorrect: true });
      }
    }
  }
}
