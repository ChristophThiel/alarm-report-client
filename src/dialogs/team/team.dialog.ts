import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'team-dialog',
    templateUrl: 'team.dialog.html'
  })
  export class TeamDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TeamDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }