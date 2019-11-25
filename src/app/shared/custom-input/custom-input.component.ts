import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() label: string;
  @Input() formControl: FormControl;
  @Input() options: any[];
  @Input() showOptionsAlways: boolean = false;

  public filteredOptions: any[];
  public errors: any[];

  constructor() {
    this.filteredOptions = [];
    this.errors = [];
  }

  public ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  public filter(): void {
    const value = this.formControl.value.toLowerCase();
    const values = this.options.filter(option => option.name.toLowerCase().includes(value));
    if (this.showOptionsAlways) {
      this.filteredOptions = values;
    } else {
      this.filteredOptions = value.length === 0 ? [] : this.options.filter(option => option.name.toLowerCase().includes(value));
    }
  }

  public getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return 'Feld wird benötigt';
    } else if (this.formControl.hasError('invalidKeyword')) {
      return 'Unbekanntes Einsatzstichwort'
    } else if (this.formControl.hasError('invalidLocation')) {
      return 'Unbekannter Einsatzort';
    }
  }

}
