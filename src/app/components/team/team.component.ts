import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private displayedColumns = ['lastname', 'firstname', 'vehicle', 'position', "edit", "delete"];
  private team: any[] = [{lastname: "Zimprich", firstname: "Christoph", vehicle: "Tank 2", position: "Einsatzleiter"},
                 {lastname: "Koblmüller", firstname: "Alexander", vehicle: "Tank 2", position: "Maschinist"}];

  constructor() { }

  ngOnInit() {
  }

  public delete(person: any): void {
    let deleted = this.team.splice(this.team.indexOf(person), 1);
    this.team = this.team.filter(entry => entry != deleted);
  }

}
export interface Member {
  lastname: string;
  firstname: string;
  vehicle: any;
  position: string;
}