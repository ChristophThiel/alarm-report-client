import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() alarm: Alarm;

  public formGroup: FormGroup;
  public keywords: any[];
  public locations: any[];
  public filteredKeywords: any[];

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.keywords = [];
    this.locations = [];
    this.filteredKeywords = [];
  }

  public ngOnInit(): void {
    this.initData();
    this.formGroup = this.builder.group({
      'keyword': ['', Validators.required],
      'location': ['', Validators.required],
      'parish': [this.alarm.parish, Validators.required],
      'alarmed': [this.alarm.alarmed, Validators.required],
      'others': ['', Validators.required],
      'damage': [''],
      'events': [''],
      'activities': ['']
    });

    this.formGroup.get('others').disable();

    // TODO: Find "better" solution
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

  public onAlarmedChanged(): void {
    const others = this.formGroup.controls['others'];
    if (this.formGroup.controls['alarmed'].value === 'Andere') {
      others.enable();
    } else {
      others.disable();
    }
  }

  private initData(): void {
    this.http.get<any[]>('/assets/keywords.json')
      .subscribe(data => {
        this.keywords = data;
        this.formGroup.get('keyword')
          .setValidators([Validators.required, invalidKeywordValidator(this.keywords)]);
      });
    this.http.get<any[]>('/assets/locations.json')
      .subscribe(data => {
        this.locations = data;
      });
  }

}

export function invalidKeywordValidator(keywords: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const invalid = keywords.filter(keyword => keyword.name === control.value).length === 0;
    return invalid ? { 'invalidKeyword': { value: control.value } } : null;
  }
}