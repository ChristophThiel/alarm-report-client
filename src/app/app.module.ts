import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { GeneralComponent } from './general/general.component';
import { TimesComponent } from './times/times.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { TeamComponent } from './team/team.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { SpecialComponent } from './special/special.component';
import { AlarmedComponent } from './alarmed/alarmed.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    TimesComponent,
    InstrumentsComponent,
    TeamComponent,
    ProtocolComponent,
    SpecialComponent,
    AlarmedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
