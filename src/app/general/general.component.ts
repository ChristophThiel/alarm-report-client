import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }

}
