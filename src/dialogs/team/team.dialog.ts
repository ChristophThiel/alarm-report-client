import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'team-dialog',
  templateUrl: 'team.dialog.html'
})
export class TeamDialog {

  public functions: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<TeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.functions = environment.functions;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
