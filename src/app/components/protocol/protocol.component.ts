import { Component, OnInit, Inject } from '@angular/core';
import { Entry } from '../../models/entry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  private time: string = "";
  private text: string = "";

  private displayedColumns = ["time", "text", "edit", "delete"];
  private entries: Entry[] = [new Entry("12:32", "Meldung laut EL, Fehlalarm, Einsatzende")];

  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  private openDialog(entry: Entry): void {
    let dialogRef = this.dialog.open(ProtocolDialog, {
      width: '40%',
      data: { id: this.entries.indexOf(entry), time: entry.time, text: entry.text }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }

  private add(): void {
    this.entries = this.entries.concat(new Entry(this.time, this.text));
  }

  private delete(entry: Entry): void {
    let deleted = this.entries.splice(this.entries.indexOf(entry), 1);
    this.entries = this.entries.filter(member => member != deleted[0]);
  }

  private update(entry: any): void {
    let update = this.entries.slice(0, this.entries.length - 1);
    update[entry.id] = new Entry(entry.time, entry.text);
    this.entries = update;
  }

}

@Component({
  selector: 'protocol-dialog',
  templateUrl: 'protocol-dialog.html'
})
export class ProtocolDialog {

  constructor(
    public dialogRef: MatDialogRef<ProtocolDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
