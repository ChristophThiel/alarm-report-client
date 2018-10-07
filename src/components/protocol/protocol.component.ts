import { Component, Input, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { Alarm } from '../../models/alarm';
import { ProtocolDialog } from '../../dialogs/protocol/protocol.dialog';
import { FormControl, Validators } from '@angular/forms';

const options = {
  hour: 'numeric',
  minute: 'numeric'
};

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent {

  @Input() public alarm: Alarm;

  public dateTime: Date;
  public text: string;

  public windowWidth: number;
  public columns = [
    'time',
    'text',
    'delete'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  public timeFormControl = new FormControl('', [
    Validators.required
  ]);
  public textFormControl = new FormControl('', [
    Validators.required
  ]);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(public dialog: MatDialog) {
    this.windowWidth = window.innerWidth;
    this.dateTime = new Date();
  }

  public openDialog(entry: any): void {
    const dialogRef = this.dialog.open(ProtocolDialog, {
      width: this.windowWidth <= 959 ? '100%' : '60%',
      maxWidth: this.windowWidth,
      data: {
        id: this.alarm.protocol.indexOf(entry),
        time: entry.time,
        text: entry.text
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        debugger
        const id = result.id;
        delete result.id;
        this.alarm.protocol[id] = result;
        this.table.renderRows();
      }
    });
  }

  public add(): void {
    if (!this.textFormControl.invalid && !this.timeFormControl.invalid) {
      this.alarm.protocol.push({
        time: this.dateTime,
        text: this.text
      });
      this.table.renderRows();
    }
  }

  public delete(entry: any): void {
    this.alarm.protocol.splice(this.alarm.protocol.indexOf(entry), 1);
    this.table.renderRows();
  }

  public formatTime(dateTime: Date): string {
    return dateTime.toLocaleTimeString('de-DE', options);
  }

}
