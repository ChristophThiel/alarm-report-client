import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alarm } from '../core/alarm.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;
  public keywords: string[] = [
    'Brandmeldealarm',
    'Brand Wohnhaus',
    'Türöffnung',
    'Personenrettung'
  ];
  public filteredKeywords: string[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      'keyword': new FormControl(this.alarm.keyword, [
        Validators.required,
        invalidKeywordValidator(this.keywords)
      ]),
      'location': new FormControl(this.alarm.location, [Validators.required]),
      'parish': new FormControl(this.alarm.parish, [Validators.required]),
      'alarmed': new FormControl(this.alarm.alarmed),
      'others': new FormControl({ value: this.alarm.others, disabled: this.alarm.others.length == 0 }, [Validators.required]),
      'damage': new FormControl(this.alarm.damage),
      'events': new FormControl(this.alarm.events),
      'activities': new FormControl(this.alarm.events)
    });
    this.formGroup.valueChanges.subscribe(_ => {
      this.alarm.keyword = this.formGroup.controls['keyword'].value;
      this.alarm.location = this.formGroup.controls['location'].value;
      this.alarm.parish = this.formGroup.controls['parish'].value;
      this.alarm.alarmed = this.formGroup.controls['alarmed'].value;
      this.alarm.others = this.formGroup.controls['others'].value;
      this.alarm.damage = this.formGroup.controls['damage'].value;
      this.alarm.events = this.formGroup.controls['events'].value;
      this.alarm.activities = this.formGroup.controls['activities'].value;
    });
  }

  public filter(): void {
    const value = this.formGroup.controls['keyword'].value.toLowerCase();
    this.filteredKeywords = this.keywords.filter(keyword => keyword.toLowerCase().includes(value));
    if (value.length === 0) {
      this.filteredKeywords = [];
    }
  }

  public onAlarmedChanged(event: any): void {
    const others = this.formGroup.controls['others'];
    if (this.formGroup.controls['alarmed'].value === 'Andere') {
      others.enable();
    } else {
      others.disable();
    }
  }

}

export function invalidKeywordValidator(keywords: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const invalid = !keywords.includes(control.value);
    return invalid ? { 'invalidKeyword': { value: control.value } } : null;
  }
}
