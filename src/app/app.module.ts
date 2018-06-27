import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './components/app/app.component';
import { GeneralComponent } from './components/general/general.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { DeviceDialog } from './dialogs/instruments/instruments.dialog';
import { TeamComponent, TeamDialog } from './components/team/team.component';
import { ProtocolComponent, ProtocolDialog } from './components/protocol/protocol.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    VehiclesComponent,
    InstrumentsComponent,
    DeviceDialog,
    TeamComponent,
    TeamDialog,
    ProtocolComponent,
    ProtocolDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [DeviceDialog, TeamDialog, ProtocolDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
