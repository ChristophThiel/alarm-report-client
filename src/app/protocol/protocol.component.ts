import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { MatDialog } from '@angular/material/dialog';
import { isUndefined, isNullOrUndefined } from 'util';

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

  public hideDivider(message: any): boolean {
    return this.messages.indexOf(message) !== this.messages.length - 1;
  }

  public initData(instance: Alarm): void {
    this.messages = isNullOrUndefined(instance.protocol) ? [] : instance.protocol;
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    const value = this.form.get('message').value;
    if (isNullOrUndefined(value) || value.length === 0)
      return;

    this.messages.unshift({
      value: this.buildMesssage(this.form.get('message').value),
      valid: true
    });
    this.form.reset();
  }

  private buildMesssage(value: string): string {
    const time = new Date();
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')} - ${value}`;
  }

}
