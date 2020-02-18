import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValidatorsService } from 'src/app/core/validators.service';

@Component({
  selector: 'add-dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddInstrumentComponent implements OnInit {

  public form: FormGroup;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddInstrumentComponent>) { }

  public ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  public close(): void {
    this.ref.close();
  }

  public onSubmit(): void {
    if (this.form.invalid)
      return;

    this.ref.close({
      name: this.form.get('name').value,
      amount: +this.form.get('amount').value
    });
  }

}
