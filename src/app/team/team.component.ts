import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../core/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChooseDialogComponent } from './choose-dialog/choose.dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public search: FormControl;

  public members: any[];
  public filteredMembers: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.members = [];
  }

  public ngOnInit(): void {
    this.search = this.builder.control('');
    this.initData();
  }

  public buildInfo(member: any): string {
    if (member.vehicle.length === 0)
      return member.position;
    return `${member.position} - ${member.vehicle}`;
  }

  public onValueChange(): void {
    if (this.search.value.length === 0)
      this.filteredMembers = this.members;
    else
      this.filteredMembers = this.members.filter(member => member.name.indexOf(this.search.value) !== -1);
  }

  public openDialog(member: any): void {
    const ref = this.dialog.open(ChooseDialogComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        position: member.position,
        vehicle: member.vehicle,
        vehicles: this.alarm.vehicles
      }
    });
    ref.afterClosed().subscribe(result => {
      member.position = result.position;
      member.vehicle = result.vehicle;
    })
  }


  private initData(): void {
    this.http.get<any[]>(environment.members)
      .subscribe(data => {
        this.members = data;
        this.filteredMembers = data;
      });
  }

}
