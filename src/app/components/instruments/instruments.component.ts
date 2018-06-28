import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Device } from '../../models/device';
import { InstrumentDialog } from '../../dialogs/instruments/instruments.dialog';
import { Vehicle } from '../../models/vehicle';
import { Unit } from '../../enums/unit';
import { Instrument } from '../../interfaces/instrument';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  private instruments: Instrument[] = [new Vehicle("Tank 2"), new Device("Besen", 1, Unit.Item)];

  private instrumentType: string = "0";
  private instrumentName: string = "";
  private instrumentCount: number = 1;
  private instrumentUnit: Unit = Unit.Item;
  private isVehicle: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

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

  /*private openDialog(device: Device): void {
    let dialogRef = this.dialog.open(DeviceDialog, {
      width: '40%',
      data: { id: this.instruments.indexOf(device),
              name: device.name,
              count: device.count,
              unit: device.unit.toString() 
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }

  private add(): void {
    if (this.isVehicle)
      this.instruments.push(this.instrumentName);
    else {
      // Checks if the device has been already added
      this.instruments.forEach(device => {
        if (device.name == this.instrumentName)
          this.delete(device);
      });
      this.instruments.push(new Device(this.instrumentName, this.instrumentCount, this.instrumentUnit));
    }
    this.clear();
  }

  private update(result: any): void {
    this.instruments[result.id] = new Device(result.name, result.count <= 0 ? 1 : result.count, result.unit);
  }

  private delete(device: Device): void {
    this.instruments.splice(this.instruments.indexOf(device), 1);
  }

  private clear(): void {
    this.instrumentType = "0";
    this.instrumentName = "";
    this.instrumentCount = 1;
    this.instrumentUnit = Unit.Stück;
    this.isVehicle = false;
  }*/

}