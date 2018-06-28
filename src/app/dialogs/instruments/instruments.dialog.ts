import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'instruments-dialog',
    templateUrl: 'instruments.dialog.html'
})
export class InstrumentDialog {

    constructor(
        public dialogRef: MatDialogRef<InstrumentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}