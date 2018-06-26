import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { TeamMember } from '../../models/teamMember';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
    alert(this.team[0].lastname);
  }

}

@Component({
  selector: 'team-dialog',
  templateUrl: 'team-dialog.html'
})
export class TeamDialog {

  constructor(
    public dialogRef: MatDialogRef<TeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}