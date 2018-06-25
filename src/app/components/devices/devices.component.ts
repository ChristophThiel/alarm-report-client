import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device } from '../../models/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  private devices: Device[] = [new Device("Besen", 2)]

  private deviceName: string = ""
  private deviceCount: number = 1

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(device: Device): void {
    let dialogRef = this.dialog.open(DeviceDialog, {
      width: '40%',
      data: { id: this.devices.indexOf(device), name: device.name, count: device.count }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }

  private add(): void {
    if (this.deviceName != "" && this.deviceCount > 0) {
      this.devices.forEach(device => {
        if (device.name == this.deviceName)
          this.delete(device);
      });
      this.devices.push(new Device(this.deviceName, this.deviceCount));
    }
  }

  private update(result: any): void {
    this.devices[result.id] = new Device(result.name, result.count <= 0 ? 1 : result.count);
  }

  private delete(device: Device): void {
    this.devices.splice(this.devices.indexOf(device), 1);
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