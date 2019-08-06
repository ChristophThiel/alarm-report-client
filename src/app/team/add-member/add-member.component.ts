import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  constructor(public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.dialogRef.close({
      name: this.data.form.get('name').value,
      function: this.data.form.get('function').value,
      vehicle: this.data.form.get('vehicle').value
    });
  }

}
