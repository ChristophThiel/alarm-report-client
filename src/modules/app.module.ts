import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from '../components/app/app.component';
import { GeneralComponent } from '../components/general/general.component';
import { VehiclesComponent } from '../components/vehicles/vehicles.component';
import { InstrumentsComponent } from '../components/instruments/instruments.component';
import { InstrumentDialog } from '../dialogs/instruments/instruments.dialog';
import { TeamComponent } from '../components/team/team.component';
import { TeamDialog } from '../dialogs/team/team.dialog';
import { ProtocolComponent } from '../components/protocol/protocol.component';
import { ProtocolDialog } from '../dialogs/protocol/protocol.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimeInputComponent } from '../components/time-input/time-input.component';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    VehiclesComponent,
    InstrumentsComponent,
    InstrumentDialog,
    TeamComponent,
    TeamDialog,
    ProtocolComponent,
    ProtocolDialog,
    TimeInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [InstrumentDialog, TeamDialog, ProtocolDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
