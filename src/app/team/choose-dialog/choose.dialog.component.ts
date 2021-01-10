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

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChooseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {
    this.form = this.builder.group({
      position: [data.position, Validators.required],
      vehicle: [{ value: data.vehicle === '' ? null : data.vehicle, disabled: this.data.vehicles.length === 0 }]
    });
    this.data.vehicles.unshift(null);

    this.dialogRef.backdropClick()
      .subscribe(_ => this.dialogRef.close({
        position: '',
        vehicle: ''
      }));
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    const result = {
      position: this.form.get('position').value,
      vehicle: this.form.get('vehicle').value ?? ''
    };
    this.dialogRef.close(result);
  }

  public reset(): void {
    this.form.reset();
    this.dialogRef.close({
      position: '',
      vehicle: ''
    });
  }

}