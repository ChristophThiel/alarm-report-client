import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric'
};

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css']
})
export class TimeInputComponent {

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public dateTime: Date;

  @Output() public dateTimeChange = new EventEmitter();

  public time: string;
  public date: string;

  constructor() {
    this.placeholder = new Date().toLocaleTimeString('de-DE', timeOptions);
    this.date = new Date().toLocaleDateString('de-DE', dateOptions);
  }

  public formatDate(date: Date): string {
    return this.dateTime.toLocaleDateString('de-DE', dateOptions);
  }

  public onValueChanged(): void {
    const value = new Date(`${this.time} ${this.date}`);
    alert(value);
  }

}
