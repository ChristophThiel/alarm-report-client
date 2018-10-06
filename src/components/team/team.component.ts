import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TeamMember } from '../../models/teamMember';
import { MatDialog } from '@angular/material';
import { TeamDialog } from '../../dialogs/team/team.dialog';
import { Alarm } from '../../models/alarm';
import { Vehicle } from '../../models/vehicle';
import { environment } from '../../environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() public alarm: Alarm;

  public firstname: string;
  public lastname: string;
  public vehicle: string;
  public function: string;

  public vehicles: Array<any>;
  public functions: Array<any>;

  public windowWidth: number;

  public lastnameFormControl = new FormControl('', [
    Validators.required
  ]);
  public firstnameFormControl = new FormControl('', [
    Validators.required
  ]);
  public functionFormControl = new FormControl('', [
    Validators.required
  ]);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(public dialog: MatDialog) {
    this.windowWidth = window.innerWidth;
  }

  public ngOnInit(): void {
    this.vehicles = this.alarm.instruments.filter((instrument) => instrument.isVehicle);
    this.functions = environment.functions;
  }

  public add(): void {
    this.alarm.team.push({
      firstname: this.firstname,
      lastname: this.lastname,
      vehicle: this.vehicle,
      function: this.function
    });
    this.firstname = '';
    this.lastname = '';
    this.vehicle = '';
    this.function = '';
  }

  public openDialog(member: any): void {
    const dialogRef = this.dialog.open(TeamDialog, {
      width: this.windowWidth <= 959 ? '100%' : '60%',
      maxWidth: this.windowWidth,
      data: {
        id: this.alarm.team.indexOf(member),
        firstname: member.firstname,
        lastname: member.lastname,
        vehicle: member.vehicle,
        function: member.function,
        vehicles: this.alarm.instruments.filter((instrument) => instrument.isVehicle)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const id = result.id;
        delete result.id;
        this.alarm.team[id] = result;
      }
    });
  }

  /* private lastname: string;
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
  }*/

}
