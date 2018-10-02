import { Component, Input } from '@angular/core';

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

  constructor() {
    this.placeholder = new Date().toLocaleTimeString('de-DE', timeOptions);
  }

  public formatDate(date: Date): string {
    return this.dateTime.toLocaleDateString('de-DE', dateOptions);
  }

}
