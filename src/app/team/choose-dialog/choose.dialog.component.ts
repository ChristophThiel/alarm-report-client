import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'choose-dialog',
  templateUrl: 'choose.dialog.component.html',
  styleUrls: ['choose.dialog.component.scss']
})
export class ChooseDialogComponent {

  public readonly positions: string[] = [
    'Atemschutzträger',
    'Einsatzleiter',
    'Fahrzeugkommandant',
    'Feuerwehrmediziner',
    'Funk',
    'Mann',
    'Maschinist',
    'Reserve',
    'Vollschutzträger',
    'Zugskommandant'
  ]
  public readonly positionsWithoutVehicle: string[] = [
    'Funk',
    'Reserve'
  ]

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChooseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {
    this.form = this.builder.group({
      position: [data.position],
      vehicle: [data.vehicle, Validators.required]
    });
  }

  private buildResult(): any {
    return {
      position: this.form.get('position').value,
      vehicle: this.isPositionWithoutVehicle() ? '' : this.form.get('vehicle').value
    }
  }

  public isPositionWithoutVehicle(): boolean {
    return this.positionsWithoutVehicle.indexOf(this.form.get('position').value) !== -1;
  }

  public onResetClick(): void {
    this.form.get('position').setValue('');
    this.form.get('vehicle').setValue('');
    this.dialogRef.close(this.buildResult());
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;
    this.dialogRef.close(this.buildResult());
  }

}