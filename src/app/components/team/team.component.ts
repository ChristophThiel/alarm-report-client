import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TeamMember } from '../../models/teamMember';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private lastname: string;
  private firstname: string;
  private vehicle: any;
  private position: string;

  private displayedColumns = ["lastname", "firstname", "vehicle", "position", "edit", "delete"];
  private team: TeamMember[] = new Array<TeamMember>();

  constructor() { }

  ngOnInit() {
  }

  public add(): void {
    this.team = this.team.concat(new TeamMember(this.lastname, this.firstname, this.vehicle, this.position));
  }

  public delete(person: TeamMember): void {
    let deleted = this.team.splice(this.team.indexOf(person), 1);
    this.team = this.team.filter(member => member != deleted[0]);
  }

  public edit(member: TeamMember): void {
    alert(member.firstname);
  }

}