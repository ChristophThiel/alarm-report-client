import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Alarm } from './alarm.model';

@Injectable()
export class ValidatorsService {

    public invalidValueValidator(error: string, values: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const invalid = values.filter(value => value.name === control.value).length === 0;
            return invalid ? { [error]: { value: control.value } } : null;
        }
    }
}