import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member/add-member.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public formGroup: FormGroup;

  constructor(public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      function: new FormControl('', [Validators.required]),
      vehicle: new FormControl('', [Validators.required])
    });
  }

  public add(formDirective: FormGroupDirective): void {
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
  }

}
