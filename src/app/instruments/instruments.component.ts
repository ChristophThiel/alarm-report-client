import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { isUndefined } from 'util';
import { MatDialog } from '@angular/material/dialog';
import { AddInstrumentComponent } from './add-dialog/add.dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public form: FormGroup;
  public vehicles: string[];

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.http.get<string[]>(environment.vehicles).subscribe(data => this.vehicles = data);
  }

  public onSubmit(directive: FormGroupDirective): void {
    if (this.form.invalid)
      return;

    this.add({
      name: this.form.get('name').value,
      amount: +this.form.get('amount').value
    });
    directive.resetForm();
  }

  public openDialog(): void {
    const ref = this.dialog.open(AddInstrumentComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      autoFocus: false
    });
    ref.afterClosed().subscribe(result => {
      if (isUndefined(result))
        return;

      this.add(result);
    })
  }

  public remove(remove: any): void {
    this.alarm.devices.splice(this.alarm.devices.indexOf(remove), 1);
  }

  private add(add: any): void {
    const found = this.alarm.devices.filter(device => device.name === add.name)[0];
    if (isUndefined(found)) {
      this.alarm.devices.push({
        name: add.name,
        amount: add.amount
      });
    } else {
      found.amount += add.amount;
    }
  }

}
