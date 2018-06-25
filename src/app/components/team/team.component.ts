import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  private team: TeamMember[] = [new TeamMember("Zimprich", "Christoph", "Tank 2", "Einsatzleiter")];
  private teamToDisplay: TeamMember[] = [new TeamMember("Zimprich", "Christoph", "Tank 2", "Einsatzleiter")];

  constructor() { }

  ngOnInit() {
  }

  public add(): void {
    if (!(this.lastname == "" ||
        this.firstname == "" ||
        this.vehicle == "" ||
        this.position == "")) {
      let contains = false;
      this.team.forEach(member => {
        if (!contains) {
          contains = member.firstname == this.firstname || member.lastname == this.lastname;
        }
      });
      if (!contains) {
        this.teamToDisplay.push(new TeamMember(this.lastname, this.firstname, this.vehicle, this.position));
        this.team = this.teamToDisplay;
      }
    }
  }

  public delete(person: any): void {
    let deleted = this.team.splice(this.team.indexOf(person), 1);
    this.team = this.team.filter(entry => entry != deleted[0]);
  }

}