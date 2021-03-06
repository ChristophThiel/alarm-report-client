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
import { InstrumentsComponent } from './instruments/instruments.component';
import { TeamComponent } from './team/team.component';
import { ChooseDialogComponent } from './team/choose-dialog/choose.dialog.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';

import { CommunicatorService } from './shared/communicator.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    InstrumentsComponent,
    TeamComponent,
    ChooseDialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    ProtocolComponent,
    FinishDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    ScrollingModule,
    PdfViewerModule
  ],
  providers: [
    CommunicatorService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT'
    }
  ],
  entryComponents: [
    ChooseDialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    FinishDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
