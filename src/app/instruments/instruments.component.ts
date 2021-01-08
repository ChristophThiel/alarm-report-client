import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { sortAlhabetical } from '../shared/sort.shared';
import { CustomErrorStateMatcher } from '../shared/custom.matcher';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

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
  public noVehicles: string[] = ['TSA', 'Boot', 'Rüst Anhänger'];

  public matcher: CustomErrorStateMatcher;

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.matcher = new CustomErrorStateMatcher();
  }

  public ngOnInit(): void {
    this.deviceForm = this.builder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.vehicleForm = this.builder.group({
      name: ['', Validators.required],
      range: ['', [Validators.required, Validators.min(0)]]
    });
    this.http.get<string[]>(environment.vehicles).subscribe(data => this.vehicles = data.sort((v1, v2) => sortAlhabetical(v1, v2)));
  }

  public buildVehicleString(vehicle: any): string {
    const result = vehicle.name;
    if (vehicle.range > 0)
      return `${result} (${vehicle.range} km)`;
    return result;
  }

  public isNoVehicle(event: any): void {
    const formControl = this.vehicleForm.get('range');
    if (this.noVehicles.indexOf(event.value) === -1) {
      formControl.enable();
    } else {
      formControl.disable();
    }
  }

  public onDeviceSubmit(formDirective: FormGroupDirective): void {
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
    formDirective.resetForm();
  }

  public onVehicleSubmit(formDirective: FormGroupDirective): void {
    if (this.vehicleForm.invalid)
      return;

    const name = this.vehicleForm.get('name').value
    const range = this.vehicleForm.get('range');
    this.alarm.vehicles.push({
      name: name,
      range: +range.value
    });
    this.vehicles.splice(this.vehicles.indexOf(name), 1);
    this.vehicleForm.reset();
    formDirective.resetForm();

    if (range.disabled)
      range.enable();
  }

  public openRemoveVehicleConfirmationDialog(vehicle: any): void {
    if (this.alarm.team.filter(member => member.vehicle === vehicle.name).length === 0) {
      this.removeVehicle(vehicle);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'dialog-container',
      data: {
        lines: [
          'Möchten Sie das Fahrzeug wirklich entfernen?',
          'Hinweis: Alle Kameraden zu diesem Fahrzeug werden zurückgesetzt.'
        ],
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result)
          return;
        this.removeVehicle(vehicle);
        this.alarm.team.forEach(member => {
          if (member.vehicle === vehicle.name) {
            member.vehicle = '';
            member.position = '';
          }
        });
      });
  }

  public removeDevice(device: any): void {
    this.alarm.devices.splice(this.alarm.devices.indexOf(device), 1);
  }

  private removeVehicle(vehicle: any): void {
    this.alarm.vehicles.splice(this.alarm.vehicles.indexOf(vehicle), 1);
    this.vehicles.push(vehicle.name);
    this.vehicles.sort((v1, v2) => sortAlhabetical(v1, v2));
  }

}