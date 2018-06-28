import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Device } from '../../models/device';
import { InstrumentDialog } from '../../dialogs/instruments/instruments.dialog';
import { Vehicle } from '../../models/vehicle';
import { DeviceUnit } from '../../enums/deviceUnit';
import { Instrument } from '../../interfaces/instrument';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  @Input() public alarm: Alarm;

  private instruments: Instrument[] = [];

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
      this.instruments.push(new Vehicle(this.instrumentName));
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
      this.instruments[data.id] = new Vehicle(data.instrument.name);
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
  }

}