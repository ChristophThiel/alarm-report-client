import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChooseDialogComponent } from './choose-dialog/choose.dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  @Input()
  public alarm: Alarm;

  public search: FormControl;

  public members: any[];
  public filteredMembers: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.members = [];
    this.filteredMembers = [];
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

  public clearValue(): void {
    this.search.setValue('');
    this.filteredMembers = this.members;
  }

  public initData(instance: Alarm): void {
    if (instance.team.length !== 0) {
      this.members = instance.team;
      this.filteredMembers = instance.team;
    } else {
      this.http.get<any[]>(environment.members)
        .subscribe(data => {
          this.members = data;
          this.filteredMembers = data;
        });
    }
  }

  public onValueChange(): void {
    if (this.search.value.length === 0)
      this.filteredMembers = this.members;
    else {
      this.filteredMembers = this.members
        .filter(member => member.name.toLowerCase().indexOf(this.search.value.toLowerCase()) !== -1);
      for (let i = 0; i < this.filteredMembers.length; i++)
        this.trackItem(i, this.filteredMembers[i]);
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
      this.alarm.team = this.members;
    });
  }

  public getRelevantMembers(): any[] {
    return this.filteredMembers.filter(member => member.position.length !== 0);
  }

  public getIrrelevantMembers(): any[] {
    return this.filteredMembers.filter(member => member.position.length === 0);
  }

  public trackItem(index: number, item: any): any {
    return item.position;
  }
}
