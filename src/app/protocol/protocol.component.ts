import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryComponent } from './add-dialog/add.dialog.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public form: FormGroup;

  public readonly messages: any[];

  constructor(public dialog: MatDialog, private builder: FormBuilder) {
    this.messages = [
      {
        value: '16:04 - Das ist eine Testnachricht',
        valid: true
      },
      {
        value: '16:12 - Das ist eine Testnachricht 2asdlöfkjas dölfjasdlfjasöldfjasdlfjas ödlfjasöldfjasödlfjasdl fjöasdlfjkasdölfjasdlfkj',
        valid: true
      }
    ]
  }

  public ngOnInit(): void {
    this.form = this.builder.group({
      message: ['', Validators.required]
    })
  }

  public add(): void {
    if (this.form.invalid)
      return;
    this.messages.push({
      value: this.buildMesssage(this.form.get('message').value),
      vaid: true
    });
  }

  public openDialog(): void {
    const ref = this.dialog.open(AddEntryComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
    });
    ref.afterClosed().subscribe(result => {
      if (isUndefined(result))
        return;

      this.messages.push({
        value: this.buildMesssage(result.message),
        valid: true
      });
    });
  }

  private buildMesssage(value: string): string {
    const time = new Date();
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')} - ${value}`;
  }

}
