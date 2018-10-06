import { Component, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InstrumentDialog } from '../../dialogs/instruments/instruments.dialog';
import { Alarm } from '../../models/alarm';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent {

  @Input() public alarm: Alarm;

  public name: string;
  public amount: number;

  public windowWidth: number;

  public nameFormControl = new FormControl('', [
    Validators.required
  ]);
  public amountFormControl = new FormControl('', [
    Validators.required
  ]);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(public dialog: MatDialog) {
    this.windowWidth = window.innerWidth;
  }

  public openDialog(instrument: any): void {
    const dialogRef = this.dialog.open(InstrumentDialog, {
      width: this.windowWidth <= 959 ? '100%' : '60%',
      maxWidth: this.windowWidth,
      data: {
        id: this.alarm.instruments.indexOf(instrument),
        name: instrument.name,
        isVehicle: instrument.isVehicle,
        amount: instrument.amount
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const id = result.id;
        delete result.id;
        this.alarm.instruments[id] = result;
      }
    });
  }

  public add() {
    if (!this.nameFormControl.invalid && !this.amountFormControl.invalid) {
      this.alarm.instruments.push({
        name: this.name,
        amount: this.amount,
        isVehicle: false
      });
    }
  }

  public remove(instrument: any) {
    const index = this.alarm.instruments.indexOf(instrument);
    this.alarm.instruments.splice(index, 1);
  }
}
