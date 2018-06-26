import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device, Unit } from '../../models/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  private devices: Device[] = [];

  private deviceName: string = "";
  private deviceCount: number = 1;
  private deviceUnit: Unit = Unit.Stück;

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
    if (this.deviceName != "" && this.deviceCount > 0) {

      // Checks if the device has been already added
      this.devices.forEach(device => {
        if (device.name == this.deviceName)
          this.delete(device);
      });
      this.devices.push(new Device(this.deviceName, this.deviceCount, this.deviceUnit));
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
    this.deviceName = "";
    this.deviceCount = 1;
    this.deviceUnit = Unit.Stück;
  }

}

@Component({
  selector: 'device-dialog',
  templateUrl: 'device-dialog.html'
})
export class DeviceDialog {

  constructor(
    public dialogRef: MatDialogRef<DeviceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}