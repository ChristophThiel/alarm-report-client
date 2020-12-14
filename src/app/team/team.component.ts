import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChooseDialogComponent } from './choose-dialog/choose.dialog.component';
import { sortAlhabetical } from '../shared/sort.shared';

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
  public relevantMembers: any[];
  public unrelevantMembers: any[];
  public filteredMembers: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.members = [];
    this.relevantMembers = [];
    this.unrelevantMembers = [];
  }

  public ngOnInit(): void {
    this.search = this.builder.control('');
    this.initData(this.alarm);
  }

  public buildInfo(member: any): string {
    if (member.vehicle.length === 0)
      return member.position;
    return `${member.position} - ${member.vehicle}`;
  }

  public initData(instance: Alarm): void {
    if (instance.team.length !== 0) {
      this.members = instance.team;
      this.filteredMembers = this.members;
      this.filterMembersWithPosition();
    } else {
      this.http.get<any[]>(environment.members)
        .subscribe(data => {
          this.members = data;
          this.filteredMembers = data;
          this.filterMembersWithPosition();
        });
    }
  }

  public onValueChange(): void {
    if (this.search.value.length === 0) {
      this.filteredMembers = this.members;
      this.filterMembersWithPosition();
    }
    else {
      this.filteredMembers = this.members
        .filter(member => member.name.toLowerCase().indexOf(this.search.value.toLowerCase()) !== -1);
      this.filterMembersWithPosition();
    }
  }

  public openDialog(member: any): void {
    const ref = this.dialog.open(ChooseDialogComponent, {
      disableClose: true,
      panelClass: 'dialog-container',
      data: {
        position: member.position,
        vehicle: member.vehicle,
        vehicles: this.alarm.vehicles
          .map(vehicle => vehicle.name)
      }
    });
    ref.afterClosed().subscribe(result => {
      if (!result)
        return;
      member.position = result.position;
      member.vehicle = result.vehicle;
      this.alarm.team = this.members.filter(member => member.position.length !== 0);
      this.filterMembersWithPosition();
      console.log(this.alarm.team)
    });
  }

  private filterMembersWithPosition(): void {
    this.relevantMembers = this.filteredMembers.filter(member => member.position.length !== 0);
    this.unrelevantMembers = this.filteredMembers.filter(member => member.position.length === 0);
  }
}
