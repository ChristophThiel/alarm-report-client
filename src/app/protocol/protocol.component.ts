import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryComponent } from './add-entry/add-entry.component';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public columnsToDisplay = ['time', 'message', 'invalid'];
  public dataSource;
  public formGroup: FormGroup;

  constructor(public datePipe: DatePipe, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.alarm.protocol);
    this.formGroup = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  public add(formDirective: FormGroupDirective): void {
    if (this.formGroup.invalid) {
      return;
    }

    const message = this.formGroup.get('message').value;
    const time = this.datePipe.transform(new Date(), 'HH:mm');

    this.alarm.protocol.push({
      message: message,
      time: time,
      invalid: false
    });

    this.formGroup.reset();
    formDirective.resetForm();
    this.dataSource = new MatTableDataSource(this.alarm.protocol);
  }

  public openDialog(): void {
    const ref = this.dialog.open(AddEntryComponent, {
      width: '80vw',
      disableClose: true,
      data: this.formGroup
    });
    ref.afterClosed().subscribe(result => {
      this.alarm.protocol.push(result);
      this.dataSource = new MatTableDataSource(this.alarm.protocol);
    });
  }

  public toggle(entry: any): void {
    const change = this.alarm.protocol[this.alarm.protocol.indexOf(entry)];
    change.invalid = !change.invalid;
    this.dataSource = new MatTableDataSource(this.alarm.protocol);
  }

}
