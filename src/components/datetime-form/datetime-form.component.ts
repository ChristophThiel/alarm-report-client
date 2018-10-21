import { Component, HostBinding, Input, ElementRef, OnDestroy } from '@angular/core';
import { DateTime } from 'src/models/datetime.model';
import { MatFormFieldControl } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { NgControl, FormBuilder, FormGroup } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'datetime-form-input',
  templateUrl: './datetime-form.component.html',
  styleUrls: ['./datetime-form.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: DateTimeFormComponent }]
})
export class DateTimeFormComponent implements MatFormFieldControl<DateTime>, OnDestroy {

  static nextId = 0;

  public parts: FormGroup;

  set value(dateTime: DateTime | null) {
    this.value = new DateTime();
    this.value.date = dateTime.date;
    this.value.time = dateTime.time;
    this.stateChanges.next();
  }

  public stateChanges: Subject<void>;

  @HostBinding() id = `datetime-form-input-${DateTimeFormComponent.nextId++}`;

  private _placeholder: string;
  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(value: string) {
    this._placeholder = value;
  }

  public ngControl: NgControl = null;
  public focused = false;

  public get empty(): boolean {
    const n = this.parts.value;
    return !n.date && !n.time;
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  private _required = false;
  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    this._required = value;
  }

  private _disabled = false;
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public errorState = false;
  public controlType = 'datetime-form-input';
  public autofilled?: boolean;

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.stateChanges = new Subject<void>();
    this.parts = fb.group({
      'date': '',
      'time': ''
    });

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  public ngOnDestroy(): void {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }

}
