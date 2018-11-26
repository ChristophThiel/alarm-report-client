import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from '../components/app/app.component';
import { GeneralComponent } from '../components/general/general.component';
import { GeneralDialog } from '../dialogs/general/general.dialog';
import { InstrumentsComponent } from '../components/instruments/instruments.component';
import { InstrumentDialog } from '../dialogs/instruments/instruments.dialog';
import { TeamComponent } from '../components/team/team.component';
import { TeamDialog } from '../dialogs/team/team.dialog';
import { ProtocolComponent } from '../components/protocol/protocol.component';
import { ProtocolDialog } from '../dialogs/protocol/protocol.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimeInputComponent } from '../components/time-input/time-input.component';
<<<<<<< HEAD
import { DateTimeComponent, TimeComponent } from '../controls/datetime/datetime.component';
=======
import { DateTimeFormComponent } from '../components/datetime-form/datetime-form.component';
>>>>>>> eed0dd16f026f5819449e9392b626b4686569e02

import { MaterialModule } from './material.module';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
<<<<<<< HEAD
    declarations: [
        AppComponent,
        GeneralComponent,
        GeneralDialog,
        InstrumentsComponent,
        InstrumentDialog,
        TeamComponent,
        TeamDialog,
        ProtocolComponent,
        ProtocolDialog,
        TimeInputComponent,
        DateTimeComponent,
        TimeComponent,
        FilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        LayoutModule
    ],
    entryComponents: [GeneralDialog, InstrumentDialog, TeamDialog, ProtocolDialog],
    providers: [],
    bootstrap: [AppComponent]
=======
  declarations: [
    AppComponent,
    GeneralComponent,
    GeneralDialog,
    InstrumentsComponent,
    InstrumentDialog,
    TeamComponent,
    TeamDialog,
    ProtocolComponent,
    ProtocolDialog,
    TimeInputComponent,
    DateTimeFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [GeneralDialog, InstrumentDialog, TeamDialog, ProtocolDialog],
  providers: [],
  bootstrap: [AppComponent]
>>>>>>> eed0dd16f026f5819449e9392b626b4686569e02
})
export class AppModule { }
