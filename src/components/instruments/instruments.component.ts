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
    this.alarm.instruments.push({
      name: this.name,
      amount: this.amount,
      isVehicle: false
    });
    alert(this.alarm.instruments[this.alarm.instruments.length - 1]);
  }

  public remove(instrument: any) {
    const index = this.alarm.instruments.indexOf(instrument);
    this.alarm.instruments.splice(index, 1);
  }

  /*private instruments: Instrument[] = [];

  private instrumentType: string = "0";
  private instrumentName: string = "";
  private instrumentCount: number = 1;
  private instrumentUnit: DeviceUnit = DeviceUnit.Item;
  private isVehicle: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { 
    this.instruments = this.instruments.concat(this.alarm.vehicles).concat(this.alarm.devices);
  }

  private checkType(): void {
    this.isVehicle = this.instrumentType == "1";
  }

  private getColor(instrument: Instrument): string {
    return instrument instanceof Vehicle ? "primary" : "default";
  }

  private add(): void {
    if (this.isVehicle)
      this.instruments.push(new Vehicle(this.instrumentName, this.instrumentCount));
    else
      this.instruments.push(new Device(this.instrumentName, this.instrumentCount, this.instrumentUnit));
  }

  private delete(instrument: Instrument): void {
    let index = this.instruments.indexOf(instrument);
    if (index != -1)
      this.instruments.splice(index, 1);
  }

  private update(data: any): void {
    if (data.instrument instanceof Vehicle)
      this.instruments[data.id] = new Vehicle(data.instrument.name, data.instrument.count);
    else 
      this.instruments[data.id] = new Device(data.instrument.name, data.instrument.count, data.instrument.unit);
  }

  private openDialog(instrument: Instrument): void {
    let data = instrument instanceof Vehicle ? instrument as Vehicle : instrument as Device;
    let dialogRef = this.dialog.open(InstrumentDialog, {
      width: '40%',
      data: {
        id: this.instruments.indexOf(instrument),
        instrument: Object.create(data),
        type: instrument instanceof Vehicle
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }*/

}