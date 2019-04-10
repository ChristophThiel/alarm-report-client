import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-alarmed',
    templateUrl: './alarmed.component.html',
    styleUrls: ['./alarmed.component.scss']
})
export class AlarmedComponent {

    public formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({});
    }

}
