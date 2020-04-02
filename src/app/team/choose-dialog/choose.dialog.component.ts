import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'choose-dialog',
  templateUrl: 'choose.dialog.component.html',
  styleUrls: ['choose.dialog.component.scss']
})
export class ChooseDialogComponent {

  public readonly positions: string[] = environment.positions;
  public readonly positionsWithoutVehicle: string[] = [
    'Funk',
    'Reserve'
  ];

  public form: FormGroup;
  public isVisible: boolean;

  constructor(public dialogRef: MatDialogRef<ChooseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {
    this.isVisible = data.vehicle.length !== 0 && this.positionsWithoutVehicle.indexOf(data.vehicle) === -1;
    this.form = this.builder.group({
      position: [data.position],
      vehicle: [data.vehicle]
    });
    this.form.get('position').valueChanges
      .subscribe(value => {
        this.isVisible = value.length !== 0 && this.positionsWithoutVehicle.indexOf(value) === -1
      });

    this.dialogRef.backdropClick()
      .subscribe(_ => this.dialogRef.close({
        position: this.form.get('position').value,
        vehicle: this.form.get('vehicle').value
      }));
  }

}