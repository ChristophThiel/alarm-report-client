import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Device, Unit } from '../../models/device';
import { DeviceDialog } from '../../dialogs/instruments/instruments.dialog';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  private vehicles: string[] = ["Tank 2", "Rüst 2"];
  private devices: Device[] = [];
  private instruments: any[] = ["Tank 2", new Device("", 0, Unit.Stück)];

  private instrumentType: string = "0";
  private instrumentName: string = "";
  private instrumentCount: number = 1;
  private instrumentUnit: Unit = Unit.Stück;
  private isVehicle: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  private openDialog(device: Device): void {
    let dialogRef = this.dialog.open(DeviceDialog, {
      width: '40%',
      data: { id: this.devices.indexOf(device),
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
      this.vehicles.push(this.instrumentName);
    else if (this.instrumentName != "" && this.instrumentCount > 0) {
      // Checks if the device has been already added
      this.devices.forEach(device => {
        if (device.name == this.instrumentName)
          this.delete(device);
      });
      this.devices.push(new Device(this.instrumentName, this.instrumentCount, this.instrumentUnit));
    }

    // Clears input fields
    this.clear();
  }

  private update(result: any): void {
    this.devices[result.id] = new Device(result.name, result.count <= 0 ? 1 : result.count, result.unit);
  }

  private delete(device: Device): void {
    this.devices.splice(this.devices.indexOf(device), 1);
  }

  private clear(): void {
    this.instrumentType = "0";
    this.instrumentName = "";
    this.instrumentCount = 1;
    this.instrumentUnit = Unit.Stück;
    this.isVehicle = false;
  }

  private checkType(): void {
    this.isVehicle = this.instrumentType == "1";
  }

}