import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-instrument',
  templateUrl: './add-instrument.component.html',
  styleUrls: ['./add-instrument.component.scss']
})
export class AddInstrumentComponent {

  public isVehicle: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddInstrumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.dialogRef.close({
      name: this.data.get('name').value,
      amount: this.data.get('amount').value,
      isVehicle: this.isVehicle
    });
  }

  public toggle(): void {
    this.isVehicle = !this.isVehicle;
  }

}
