import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Alarm } from '../core/alarm.model';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member/add-member.component';
import { isUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChooseDialogComponent } from './choose-dialog/choose.dialog.component';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public formGroup: FormGroup;

  public members: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.members = [];
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      function: new FormControl('', [Validators.required]),
      vehicle: new FormControl('', [Validators.required])
    });
    this.initData();
  }

  public buildInfo(member: any): string {
    if (member.vehicle.length === 0)
      return member.position;
    return `${member.position} - ${member.vehicle}`;
  }

  public openDialog(member: any): void {
    const ref = this.dialog.open(ChooseDialogComponent, {
      width: '80vw',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        position: member.position,
        vehicle: member.vehicle,
        vehicles: this.alarm.vehicles.map(vehicle => vehicle.name)
      }
    });

    ref.afterClosed().subscribe(result => {
      if (isUndefined(result))
        return;

      member.position = result.position;
      member.vehicle = result.vehicle;
    });
  }

  private initData(): void {
    this.http.get<any[]>(environment.members)
      .subscribe(data => {
        this.members = data;
      });
  }

  /* this.http.get<any[]>(environment.keywords)
  .subscribe(data => {
    this.keywords = data;
    this.formGroup.get('keyword')
      .setValidators([Validators.required, this.validators.invalidValueValidator('invalidKeyword', this.keywords)]);
  }); */

  /* public add(formDirective: FormGroupDirective): void {
    if (this.formGroup.invalid) {
      return;
    }
    const name = this.formGroup.get('name').value;
    const func = this.formGroup.get('function').value;
    const vehicle = this.formGroup.get('vehicle').value;

    this.alarm.team.push({
      name: name,
      function: func,
      vehicle: vehicle
    });
    this.formGroup.reset();
    formDirective.resetForm();
  }

  public filter(vehicleName: string): any[] {
    return this.alarm.team.filter(member => member.vehicle === vehicleName);
  }

  public openDialog(): void {
    const ref = this.dialog.open(AddMemberComponent, {
      width: '80vw',
      disableClose: true,
      data: {
        form: this.formGroup,
        alarm: this.alarm
      }
    });
    ref.afterClosed().subscribe(result => {
      this.add(result);
    })
  }

  public remove(member: any): void {
    this.alarm.team.splice(this.alarm.team.indexOf(member), 1)
  } */

}
