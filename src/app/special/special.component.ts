import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-special',
    templateUrl: './special.component.html',
    styleUrls: ['./special.component.scss']
})
export class SpecialComponent {

    public formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({});
    }

}
