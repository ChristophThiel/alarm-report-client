import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { sortAlhabetical } from '../shared/sort.shared';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public vehicleForm: FormGroup;
  public deviceForm: FormGroup;

  public vehicles: string[];
  public noVehicles: string[] = ['TSA', 'Boot', 'Rüst Anhänger']

  constructor(private builder: FormBuilder, private http: HttpClient) { }

  public ngOnInit(): void {
    this.deviceForm = this.builder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.vehicleForm = this.builder.group({
      name: ['', Validators.required],
      range: ['', [Validators.required, Validators.min(1)]]
    });
    this.http.get<string[]>(environment.vehicles).subscribe(data => this.vehicles = data.sort((v1, v2) => sortAlhabetical(v1, v2)));
  }

  public isNoVehicle(vehicle: string) {
    return this.noVehicles.indexOf(vehicle) === -1;
  }

  public onDeviceSubmit(): void {
    if (this.deviceForm.invalid)
      return;

    const name = this.deviceForm.get('name').value;
    const amount = +this.deviceForm.get('amount').value;
    const search = this.alarm.devices.filter(device => device.name === name);
    if (search.length > 0)
      search[0].amount += amount;
    else
      this.alarm.devices.push({
        name: name,
        amount: amount
      });
    this.deviceForm.reset();
  }

  public onVehicleSubmit(): void {
    if (this.vehicleForm.invalid)
      return;

    const name = this.vehicleForm.get('name').value
    const range = +this.vehicleForm.get('range').value;
    this.alarm.vehicles.push({
      name: name,
      range: range
    });
    this.vehicles.splice(this.vehicles.indexOf(name), 1);
    this.vehicleForm.reset();
  }

  public removeVehicle(vehicle: any): void {
    this.alarm.vehicles.splice(this.alarm.vehicles.indexOf(vehicle), 1);
    this.vehicles.push(vehicle.name);
    this.vehicles.sort((v1, v2) => sortAlhabetical(v1, v2));
  }

  public removeDevice(device: any): void {
    this.alarm.devices.splice(this.alarm.devices.indexOf(device), 1);
  }

}