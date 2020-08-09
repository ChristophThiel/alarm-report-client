import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return (control.dirty || control.touched) && control.invalid;
  }
}