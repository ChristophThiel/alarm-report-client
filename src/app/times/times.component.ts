import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      startDate: new FormControl(this.alarm.startDate, [Validators.required])
    });
  }

}
