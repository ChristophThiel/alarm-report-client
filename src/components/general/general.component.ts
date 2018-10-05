import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Alarm } from '../../models/alarm';
import { AlarmKeyword } from '../../models/alarmKeyword';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { Alarmed } from '../../enums/alarmedBy';
import { GeneralDialog } from '../../dialogs/general/general.dialog';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: []
})
export class GeneralComponent implements OnInit {

  @Input() public alarm: Alarm;

  public alarmKeywords: AlarmKeyword;
  public keywords: string[] = [];
  public filteredKeywords: string[] = [];

  public separatorKeysCodes = [ENTER];
  public isOthersSelected: boolean;
  public fire: boolean;
  public organisations = [{
    name: 'Rettung',
    isSelected: false
  },
  {
    name: 'ÖBB',
    isSelected: false
  }];

  public times: Array<any>;

  public alarmKeywordFormControl = new FormControl('', [
    Validators.required,
    this.validKeyword
  ]);
  public streetFormControl = new FormControl('', [
    Validators.required
  ]);
  public parishFormControl = new FormControl('', [
    Validators.required
  ]);

  public windowWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.windowWidth = window.innerWidth;
  }

  constructor(public dialog: MatDialog) {
    this.windowWidth = window.innerWidth;
  }

  public ngOnInit() { }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.alarm.departments.push({
        name: value.trim(),
        isHeadOfOperation: false
      });
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(department: any): void {
    const index = this.alarm.departments.indexOf(department);
    if (index >= 0) {
      const removed = this.alarm.departments.splice(index, 1);
      if (removed[0].isHeadOfOperation) {
        this.setHeadOfOperation(this.alarm.departments[0]);
      }
    }
  }

  public setHeadOfOperation(department: any): void {
    this.alarm.departments.forEach(element => {
      if (element.name === department.name) {
        element.isHeadOfOperation = true;
      } else {
        element.isHeadOfOperation = false;
      }
    });
  }

  public selectOrganisation(organisation: any): void {
    this.organisations.forEach(element => {
      if (element.name === organisation.name) {
        element.isSelected = !element.isSelected;
        if (element.isSelected) {
          this.alarm.organisations.push(organisation);
        } else {
          const position = this.alarm.organisations.indexOf(organisation);
          this.alarm.organisations.splice(position, 1);
        }
      }
    });
  }

  public enableOthers(): void {
    this.isOthersSelected = this.alarm.alarmedBy !== Alarmed.Andere;
  }

  public openDialog(injuredPerson: any): void {
    const data = {
      id: this.alarm.injuredPeople.indexOf(injuredPerson),
      firstname: injuredPerson.firstname,
      lastname: injuredPerson.lastname,
      isMale: injuredPerson.isMale,
      street: injuredPerson.street,
      parish: injuredPerson.parish,
      postcode: injuredPerson.postcode,
      phoneNumber: injuredPerson.phoneNumber,
      email: injuredPerson.email,
      passedOrganisation: injuredPerson.passedOrganisation,
      organisations: this.organisations.filter((organisation) => organisation.isSelected)
    };
    const dialogRef = this.dialog.open(GeneralDialog, {
      width: this.windowWidth <= 959 ? '100%' : '60%',
      maxWidth: this.windowWidth,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const id = result.id;
        delete result.id;
        if (id === -1) {
          this.alarm.injuredPeople.push(result);
        } else {
          this.alarm.injuredPeople[id] = result;
        }
      }
    });
  }

  public removePerson(person: any): void {
    const index = this.alarm.injuredPeople.indexOf(person);
    this.alarm.injuredPeople.splice(index, 1);
  }

  public setAlarmType(): void {
    for (let i = 0; i < environment.keywords.length; i++) {
      if (environment.keywords[i].name === this.alarm.alarmKeyword) {
        this.alarm.isFireAlarmType = environment.keywords[i].isFire;
      }
    }
  }

  public validKeyword(control: FormControl): any {
    for (let i = 0; i < environment.keywords.length; i++) {
      if (environment.keywords[i].name === control.value) {
        return null;
      }
    }
    return {
      validKeyword: {
        valid: false
      }
    };
  }
}
