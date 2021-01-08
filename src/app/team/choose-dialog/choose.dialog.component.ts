import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      position: [data.position],
      vehicle: [{ value: data.vehicle, disabled: this.data.vehicles.length === 0 }]
    });

    this.dialogRef.backdropClick()
      .subscribe(_ => this.close());
  }

  public onSubmit(): void {
    this.close();
  }

  public reset(): void {
    this.form.reset();
    this.close();
  }

  private close(): void {
    const items = Object.keys(this.form.controls)
      .filter(key => this.form.get(key).value != null);

    const result = {
      position: '',
      vehicle: ''
    };
    if (items.length !== 0) {
      result.position = this.form.get('position').value;
      result.vehicle = this.form.get('vehicle').value;
    }

    this.dialogRef.close(result);
  }

}