import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alarm } from '../shared/alarm.model';
import { PdfService } from '../shared/pdf.service';

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.scss']
})
export class FinishDialogComponent {

  @ViewChild('report') report: ElementRef;

  public alarm: Alarm;
  public doc: any;

  constructor(private dialogRef: MatDialogRef<FinishDialogComponent>,
    private pdfService: PdfService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.alarm = data;
    this.doc = this.pdfService.create(this.alarm)
      .output('dataurlstring');
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public print(): void {
    // Send file to printer

    this.save();
  }

  public save(): void {
    this.pdfService.save(this.alarm);
    this.dialogRef.close();
  }

}
