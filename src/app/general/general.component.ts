import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Alarm } from '../core/alarm.model';
import { HttpClient } from '@angular/common/http';
import { ValidatorsService } from '../core/validators.service';
import { isNullOrUndefined } from 'util';
import { environment } from 'src/environments/environment';

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
  public parishes: any[];
  public filteredLocations: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private validators: ValidatorsService) {
    this.keywords = [];
    this.locations = [];
    this.parishes = [];
    this.filteredLocations = [];
  }

  public ngOnInit(): void {
    this.formGroup = this.builder.group({
      'keyword': ['', Validators.required],
      'type': ['Brand', Validators.required],
      'location': ['', Validators.required],
      'parish': [this.alarm.parish, Validators.required],
      'alarmed': [this.alarm.alarmedBy, Validators.required],
      'others': [{ value: '', disabled: true }, Validators.required],
      'damage': [''],
      'events': [''],
      'activities': ['']
    });
    this.initData();
  }

  public onKeywordChanged(): void {
    const currentKeyword = this.formGroup.get('keyword').value;
    this.alarm.keyword = currentKeyword;

    const help = this.keywords.filter(keyword => keyword.name === currentKeyword)[0];
    let isFire = this.alarm.isFire;
    if (!isNullOrUndefined(help))
      isFire = help.isFire;
    this.formGroup.get('type').setValue(isFire ? 'Brand' : 'Technisch');
  }

  public onParishChanged(): void {
    const currentParishName = this.formGroup.get('parish').value;
    let help = this.parishes.filter(parish => parish.name === currentParishName)[0];
    if (isNullOrUndefined(help))
      this.alarm.postCode = 0;
    else {
      this.alarm.postCode = help.postCode;
      this.filteredLocations = this.locations.filter(location => location.postCode === this.alarm.postCode);
      console.log(this.filteredLocations);
      const currentLocation = this.formGroup.get('location');
      if (currentLocation.value.length !== 0) {
        currentLocation.setValidators([Validators.required, this.validators.invalidValueValidator('invalidLocation', this.filteredLocations)]);
        currentLocation.updateValueAndValidity();
      }
    }
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
    this.http.get<any[]>(environment.keywords)
      .subscribe(data => {
        this.keywords = data;
        this.formGroup.get('keyword')
          .setValidators([Validators.required, this.validators.invalidValueValidator('invalidKeyword', this.keywords)]);
      });
    this.http.get<any[]>(environment.parishes)
      .subscribe(data => {
        this.parishes = data;
        this.formGroup.get('parish')
          .setValidators([Validators.required, this.validators.invalidValueValidator('invalidParish', this.parishes)]);
      });
    this.http.get<any[]>(environment.locations)
      .subscribe(data => {
        this.locations = data;
        const currentParish = this.formGroup.get('parish').value;
        const postCode = this.parishes.filter(parish => parish.name === currentParish)[0].postCode;
        this.filteredLocations = this.locations.filter(location => location.postCode === postCode);
        this.formGroup.get('location')
          .setValidators([Validators.required, this.validators.invalidValueValidator('invalidLocation', this.filteredLocations)]);
      });
  }
}