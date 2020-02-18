import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  public form: FormGroup;

  public types: string[];
  public keywords: any[];
  public alarmedByOptions: string[];
  public filteredKeywords: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private validators: ValidatorsService) {
    this.types = environment.types;
    this.keywords = [];
    this.alarmedByOptions = environment.alarmedByOptions;
  }

  public ngOnInit(): void {
    this.form = this.builder.group({
      type: ['Brand', Validators.required],
      keyword: ['', Validators.required],
      location: ['', Validators.required],
      parish: [this.alarm.parish, Validators.required],
      alarmed: [this.alarm.alarmedBy, Validators.required],
      others: [{ value: '', disabled: true }, Validators.required],
      damage: [''],
      events: [''],
      activities: ['']
    });
    this.initData();
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.form.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    } else if (control.hasError('invalidKeyword')) {
      return 'Ungültiges Einsatzstichwort';
    }
  }

  public onAlarmedChanged(): void {
    const alarmed = this.form.get('alarmed');
    const others = this.form.get('others');

    this.alarm.alarmedBy = alarmed.value;
    if (alarmed.value === environment.alarmedByOptions[0]) {
      others.disable();
    } else {
      others.enable();
    }
  }

  public onTypeChanged(): void {
    const isFire = this.form.get('type').value === environment.types[0];
    this.alarm.isFire = isFire;
    this.filteredKeywords = this.keywords.filter(keyword => keyword.isFire === isFire);
    this.form.get('keyword').setValidators(this.validators.invalidValueValidator('invalidKeyword', this.filteredKeywords));
  }

  private initData(): void {
    this.http.get<any[]>(environment.keywords)
      .subscribe(data => {
        this.keywords = data;
        this.filteredKeywords = this.keywords.filter(keyword => keyword.isFire);
        this.form.get('keyword').setValidators(this.validators.invalidValueValidator('invalidKeyword', this.filteredKeywords));
      });
  }
}