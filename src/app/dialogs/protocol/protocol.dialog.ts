import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'protocol-dialog',
    templateUrl: 'protocol.dialog.html'
  })
  export class ProtocolDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ProtocolDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }