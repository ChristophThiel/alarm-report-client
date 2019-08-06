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
  public keywords: any[] = [
    {
      name: 'Brandmeldealarm',
      isFire: true
    },
    {
      name: 'Brand Wohnhaus',
      isFire: true
    },
    {
      name: 'Türöffnung',
      isFire: false
    },
    {
      name: 'Personenrettung',
      isFire: false
    }
  ];
  public filteredKeywords: any[] = [];

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
      const currentKeyword = this.keywords.filter(keyword => keyword.name === this.alarm.keyword);
      this.alarm.isFire = currentKeyword.length === 1 ? currentKeyword[0].isFire : false;
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
    this.filteredKeywords = this.keywords.filter(keyword => keyword.name.toLowerCase().includes(value));
    if (value.length === 0) {
      this.filteredKeywords = [];
    }
  }

  public toggleType(): void {
    this.alarm.isFire = !this.alarm.isFire;
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

export function invalidKeywordValidator(keywords: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const invalid = keywords.filter(keyword => keyword.name === control.value).length === 0;
    return invalid ? { 'invalidKeyword': { value: control.value } } : null;
  }
}
