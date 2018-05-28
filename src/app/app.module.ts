import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { GeneralComponent } from './components/general/general.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Browser } from 'protractor';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
