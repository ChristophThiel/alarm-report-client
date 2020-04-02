import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Alarm } from '../shared/alarm.model';
import { HttpClient } from '@angular/common/http';
import { ValidatorsService } from '../shared/validators.service';
import { environment } from 'src/environments/environment';
import { sortAlhabetical } from '../shared/sort.shared';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() alarm: Alarm;

  public form: FormGroup;

  public types: string[];
  public alarmTypes: string[];
  public alarmedByOptions: string[];
  public officers: string[];
  public filteredKeywords: any[];

  constructor(private builder: FormBuilder, private http: HttpClient, private validators: ValidatorsService) {
    this.types = environment.types;
    this.alarmTypes = environment.alarmTypes;
    this.alarmedByOptions = environment.alarmedByOptions;
    this.officers = environment.officers
      .sort((a, b) => sortAlhabetical(a, b));
  }

  public ngOnInit(): void {
    // this.initData();
    this.initForm(this.alarm);
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.form.get(formControlName);
    if (control.hasError('required')) {
      return 'Feld wird benötigt';
    } else if (control.hasError('invalidKeyword')) {
      return 'Ungültiges Einsatzstichwort';
    }
  }

  public initForm(instance: Alarm): void {
    this.form = this.builder.group({
      type: [instance.isFire ? 'Brand' : 'Technisch', Validators.required],
      //keyword: [instance.keyword, Validators.required],
      location: [instance.location, Validators.required],
      parish: [instance.parish, Validators.required],
      alarmed: [instance.alarmedBy, Validators.required],
      others: [{ value: instance.others, disabled: true }, Validators.required],
      damage: [instance.damage],
      events: [instance.events],
      activities: [instance.activities]
    });
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
}