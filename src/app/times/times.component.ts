import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent {

  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }

}
