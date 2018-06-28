import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../../models/teamMember';
import { MatDialog } from '@angular/material';
import { TeamDialog } from '../../dialogs/team/team.dialog';
import { Alarm } from '../../models/alarm';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() public alarm: Alarm;

  private lastname: string;
  private firstname: string;
  private vehicle: Vehicle;
  private position: string;

  private displayedColumns = ["lastname", "firstname", "vehicle", "position", "edit", "delete"];
  private team: TeamMember[] = new Array<TeamMember>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.team = this.alarm.team;
  }

  private openDialog(member: TeamMember): void {
    let dialogRef = this.dialog.open(TeamDialog, {
      width: '40%',
      data: { id: this.team.indexOf(member), lastname: member.lastname, firstname: member.firstname, vehicle: member.vehicle, position: member.position }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.update(result);
    });
  }

  private add(): void {
    this.team = this.team.concat(new TeamMember(this.lastname, this.firstname, this.vehicle, this.position));
  }

  private delete(person: TeamMember): void {
    let deleted = this.team.splice(this.team.indexOf(person), 1);
    this.team = this.team.filter(member => member != deleted[0]);
  }

  private update(member: any) {
    let update = this.team.slice(0, this.team.length - 1);
    update[member.id] = new TeamMember(member.lastname, member.firstname, member.vehicle, member.position);
    this.team = update;
  }

}