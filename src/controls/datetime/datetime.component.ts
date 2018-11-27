import { Component, OnDestroy, Input, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-datetime',
    templateUrl: './datetime.component.html',
    styleUrls: ['./datetime.component.css']
})
export class DateTimeComponent {
    @Input() public placeholder: string;
    @Input() public dateTime: Date;
    public date: Date;
    public time: Time;

    public formControl = new FormControl('', [
        Validators.required
    ]);

    constructor(private breakpointObserver: BreakpointObserver) {
        if (!isNullOrUndefined(this.dateTime)) {
            this.date = this.dateTime;
            this.time = new Time(this.dateTime.getMinutes().toString(), this.dateTime.getSeconds().toString());
        } else {
            this.date = new Date();
        }
    }
}

export class Time {
    constructor(public minutes: string, public seconds: string) { }
}

@Component({
    selector: 'app-time',
    templateUrl: './time-input.html',
    providers: [{ provide: MatFormFieldControl, useExisting: TimeComponent }],
    styleUrls: ['./time-input.css'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[class.floating]': 'shouldLabelFloat'
    }
})
export class TimeComponent implements MatFormFieldControl<Time>, OnDestroy {
    static nextId = 0;

    parts: FormGroup;
    stateChanges = new Subject<void>();
    focused = false;
    ngControl = null;
    errorState = false;
    controlType = 'example-tel-input';
    id = `example-tel-input-${TimeComponent.nextId++}`;
    describedBy = '';

    get empty() {
        const { value: { minutes, seconds } } = this.parts;

        return !minutes && !seconds;
    }

    get shouldLabelFloat() { return this.focused || !this.empty; }

    @Input()
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get value(): Time | null {
        const { value: { minutes, seconds } } = this.parts;
        if (minutes >= 0 && minutes <= 23 && seconds >= 0 && seconds <= 59) {
            return new Time(minutes, seconds);
        }
        return null;
    }
    set value(time: Time | null) {
        const { minutes, seconds } = time || new Time('', '');
        this.parts.setValue({ minutes, seconds });
        this.stateChanges.next();
    }

    constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
        this.parts = fb.group({
            minutes: '',
            seconds: ''
        });

        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            // tslint:disable-next-line:no-non-null-assertion
            this.elRef.nativeElement.querySelector('input')!.focus();
        }
    }
}
