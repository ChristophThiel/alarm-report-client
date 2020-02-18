import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddEntryComponent {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEntryComponent>, private builder: FormBuilder) {
    this.form = this.builder.group({
      message: ['', Validators.required]
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    this.dialogRef.close({
      message: this.form.get('message').value
    });
    /*this.dialogRef.close({
      message: this.data.get('message').value,
      time: this.datePipe.transform(new Date(), 'HH:mm'),
      invalid: false
    });
    this.data.reset();*/
  }
}
