import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { isUndefined } from 'util';
import { MatDialog } from '@angular/material/dialog';
import { AddInstrumentComponent } from './add-instrument/add-instrument.component';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public formGroup: FormGroup;
  public isVehicle: boolean = false;

  constructor(public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    });
  }

  public toggle(): void {
    this.isVehicle = !this.isVehicle;
  }

  public add(formDirective: FormGroupDirective): void {
    if (this.formGroup.invalid) {
      return;
    }
    const name = this.formGroup.get('name').value;
    const amount = +this.formGroup.get('amount').value;
    this.addInstrument({
      name: name,
      amount: amount,
      isVehicle: this.isVehicle
    });
    formDirective.resetForm();
  }

  public openDialog(): void {
    const ref = this.dialog.open(AddInstrumentComponent, {
      width: '80vw',
      disableClose: true,
      data: this.formGroup
    });
    ref.afterClosed().subscribe(result => {
      this.addInstrument(result);
    })
  }

  public remove(instrument: any): void {
    if (!isUndefined(this.alarm.vehicles.find(vehicle => vehicle.name === instrument.name))) {
      this.alarm.vehicles.splice(this.alarm.vehicles.indexOf(instrument), 1);
    } else {
      this.alarm.devices.splice(this.alarm.devices.indexOf(instrument), 1);
    }
  }

  private addInstrument(data: any): void {
    let collection = this.alarm.devices;
    if (data.isVehicle) {
      collection = this.alarm.vehicles;
    }
    const contains = collection.find(instrument => instrument.name === data.name);
    if (!isUndefined(contains)) {
      contains.amount = +contains.amount + +data.amount;
    } else {
      collection.push({
        name: data.name,
        amount: data.amount
      });
    }
    this.formGroup.reset();
  }

}
