import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: any[];
  @Input() showOptionsAlways: boolean = false;

  @Output() valueChanged: EventEmitter<string>;

  public filteredOptions: any[];
  public errors: any[];

  constructor() {
    this.valueChanged = new EventEmitter();
    if (this.showOptionsAlways) {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = [];
    }
    console.log(this.filteredOptions);
    this.errors = [];
  }

  public ngOnInit(): void { }

  public filter(): void {
    const value = this.control.value.toLowerCase();
    const values = this.options.filter(option => option.name.toLowerCase().startsWith(value));
    if (this.showOptionsAlways) {
      this.filteredOptions = values;
    } else {
      this.filteredOptions = value.length === 0 ? [] : values;
    }
  }

  public getErrorMessage(): string {
    if (this.control.hasError('required')) {
      return 'Feld wird benötigt';
    } else if (this.control.hasError('invalidKeyword')) {
      return 'Ungültiges Einsatzstichwort'
    } else if (this.control.hasError('invalidParish')) {
      return 'Unbekannte Gemeinde';
    } else if (this.control.hasError('invalidLocation')) {
      return 'Unbekannter Einsatzort';
    }
  }

  public onValueChanged(): void {
    this.valueChanged.emit(this.control.value);
  }

}
