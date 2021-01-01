import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alarm } from '../shared/alarm.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.scss']
})
export class FinishDialogComponent {

  @ViewChild('report') report: ElementRef;

  public alarm: Alarm;

  constructor(private dialogRef: MatDialogRef<FinishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.alarm = data;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public print(): void {
    html2canvas(this.report.nativeElement)
      .then(canvas => {
        var pdf = new jsPDF('p', 'pt', 'a4');
        var data = canvas.toDataURL('image/jpeg', 1);

        pdf.addImage(data, 0, 0, canvas.width, canvas.height);
        pdf.save('test.pdf');
      });
  }

}
