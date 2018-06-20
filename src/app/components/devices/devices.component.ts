import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  private devices: any[] = [{count: 2, name: "Besen"}]

  private deviceName: string = ""
  private deviceCount: number = 1

  constructor() { }

  ngOnInit() {
  }

  private add(): void {
    if (this.deviceName != "" && this.deviceCount > 0) {
      this.devices.forEach(device => {
        if (device.name == this.deviceName) {
          this.deviceCount += device.count
          this.delete(device);
        }
      });
      this.devices.push({position: this.devices.length, name: this.deviceName, count: this.deviceCount});
    }
  }

  private delete(device: any): void {
    this.devices.splice(this.devices.indexOf(device), 1);
  }

}
