import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent {

  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }

}
