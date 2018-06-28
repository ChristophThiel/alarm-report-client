import { Component, OnInit, Inject, Input } from '@angular/core';
import { ProtocolEntry } from '../../models/protocolEntry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProtocolDialog } from '../../dialogs/protocol/protocol.dialog';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  @Input() public alarm: Alarm;

  private time: string = "";
  private text: string = "";

  private displayedColumns = ["time", "text", "edit", "delete"];
  private entries: ProtocolEntry[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  private openDialog(entry: ProtocolEntry): void {
    let dialogRef = this.dialog.open(ProtocolDialog, {
      width: '40%',
      data: { id: this.entries.indexOf(entry), time: entry.time, text: entry.text }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }

  private add(): void {
    this.entries = this.entries.concat(new ProtocolEntry(this.time, this.text));
  }

  private delete(entry: ProtocolEntry): void {
    let deleted = this.entries.splice(this.entries.indexOf(entry), 1);
    this.entries = this.entries.filter(member => member != deleted[0]);
  }

  private update(entry: any): void {
    let update = this.entries.slice(0, this.entries.length - 1);
    update[entry.id] = new ProtocolEntry(entry.time, entry.text);
    this.entries = update;
  }

}