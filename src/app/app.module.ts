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
import { TeamComponent } from './team/team.component';
import { ChooseDialogComponent } from './team/choose-dialog/choose.dialog.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { SpecialComponent } from './special/special.component';
import { AlarmedComponent } from './alarmed/alarmed.component';

import { ValidatorsService } from './shared/validators.service';
import { CommunicatorService } from './shared/communicator.service';
import { MAT_DATE_LOCALE, ErrorStateMatcher } from '@angular/material/core';

import { CustomErrorStateMatcher } from './shared/custom.matcher';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    TimesComponent,
    InstrumentsComponent,
    TeamComponent,
    ChooseDialogComponent,
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
    FlexLayoutModule,
    ScrollingModule
  ],
  providers: [
    ValidatorsService,
    CommunicatorService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT'
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorStateMatcher
    }
  ],
  entryComponents: [
    ChooseDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
