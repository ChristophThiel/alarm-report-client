import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent {

  public columnsToDisplay = ['time', 'message'];
  public formGroup: FormGroup;

  public protocol = [{
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: true
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: false
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: true
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: false
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: true
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: false
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: true
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: false
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: true
  },
  {
    time: '18:32',
    message: 'Meldung von EL, Tank 3 eingetroffen',
    valid: false
  }]

  constructor() {
    this.formGroup = new FormGroup({});
  }

}
