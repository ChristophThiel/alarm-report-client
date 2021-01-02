import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public form: FormGroup;

  public messages: any[];

  constructor(public dialog: MatDialog, private builder: FormBuilder) {
    this.messages = []
  }

  public ngOnInit(): void {
    this.form = this.builder.group({
      message: ''
    });
    this.initData(this.alarm);
  }

  public formatDateTime(message: any): string {
    return `${moment(message.dateTime).format('HH:mm [(]DD.MM.YYYY[)]')}`;
  }

  public hideDivider(message: any): boolean {
    return this.messages.indexOf(message) !== this.messages.length - 1;
  }

  public initData(instance: Alarm): void {
    this.messages = instance.protocol == null ? [] : instance.protocol;
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    const value = this.form.get('message').value;
    if (value == null || value.length === 0)
      return;

    this.messages.unshift({
      value: this.form.get('message').value,
      dateTime: moment().locale('de').toDate(),
      valid: true
    });
    this.form.reset();
  }

}
