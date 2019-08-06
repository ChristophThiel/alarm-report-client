import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent {

  constructor(public datePipe: DatePipe, public dialogRef: MatDialogRef<AddEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.dialogRef.close({
      message: this.data.get('message').value,
      time: this.datePipe.transform(new Date(), 'HH:mm'),
      invalid: false
    });
    this.data.reset();
  }
}
