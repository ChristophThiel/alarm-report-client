import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { GeneralComponent } from './general/general.component';
import { TimesComponent } from './times/times.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { AddInstrumentComponent } from './instruments/add-instrument/add-instrument.component';
import { TeamComponent } from './team/team.component';
import { ChooseDialogComponent } from './team/choose-dialog/choose.dialog.component';
import { AddMemberComponent } from './team/add-member/add-member.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { AddEntryComponent } from './protocol/add-entry/add-entry.component';
import { SpecialComponent } from './special/special.component';
import { AlarmedComponent } from './alarmed/alarmed.component';

import { DatePipe } from '@angular/common';
import { ValidatorsService } from './core/validators.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { CustomInputComponent } from './shared/custom-input/custom-input.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    TimesComponent,
    InstrumentsComponent,
    AddInstrumentComponent,
    TeamComponent,
    ChooseDialogComponent,
    AddMemberComponent,
    ProtocolComponent,
    AddEntryComponent,
    SpecialComponent,
    AlarmedComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    ScrollingModule
  ],
  providers: [
    DatePipe,
    ValidatorsService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT'
    }
  ],
  entryComponents: [
    AddInstrumentComponent,
    ChooseDialogComponent,
    AddMemberComponent,
    AddEntryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
