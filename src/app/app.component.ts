import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Alarm } from './shared/alarm.model';
import { CommunicatorService } from './shared/communicator.service';
import { PdfService } from './shared/pdf.service';
import { GeneralComponent } from './general/general.component';
import { TeamComponent } from './team/team.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { MatDialog } from '@angular/material/dialog';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { MatTabGroup } from '@angular/material/tabs';
import { take } from 'rxjs/operators';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public alarm: Alarm;

  @ViewChild("tabs") tabs: MatTabGroup;

  @ViewChild('general') generalReference: GeneralComponent;
  @ViewChild('instruments') instrumentsReference: InstrumentsComponent;
  @ViewChild('team') teamReference: TeamComponent;
  @ViewChild('protocol') protocolReference: ProtocolComponent;

  constructor(private communicator: CommunicatorService,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private pdfService: PdfService) {
    this.initializeIcons(iconRegistry, domSanitizer);
  }

  public ngOnInit(): void {
    this.alarm = new Alarm();
  }

  public new(): void { }

  public open(): void {
    this.communicator.openFile()
      .then(result => {
        this.alarm = result as Alarm;
        this.initializeForms();
      });
  }

  // This function creates the .rep file
  public save(): void {
    this.communicator.saveFile(this.alarm);
  }

  // This function creates the pdf
  public finish(): void {
    if (!this.isGeneralValid()) {
      if (this.tabs.selectedIndex === 0)
        this.validateGeneral();
      else {
        this.tabs.selectedIndex = 0;
        this.tabs.animationDone.pipe(take(1))
          .subscribe(() => this.validateGeneral());
      }
    } else if (!this.isTeamValid()) {
      if (this.tabs.selectedIndex === 2)
        this.openPositionErrorDialog();
      else {
        this.tabs.selectedIndex = 2;
        this.tabs.animationDone.pipe(take(1))
          .subscribe(() => this.openPositionErrorDialog());
      }
    }

    if (this.isGeneralValid() && this.isTeamValid()) {
      this.dialog.open(FinishDialogComponent, { data: this.alarm })
    }
  }

  private initializeForms(): void {
    this.generalReference.initForm(this.alarm);
    this.teamReference.initData(this.alarm);
    this.protocolReference.initData(this.alarm);
  }

  private initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    iconRegistry.addSvgIcon('bars', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bars.svg'));
    iconRegistry.addSvgIcon('bolt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bolt.svg'));
    iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg'));
    iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/check.svg'));
    iconRegistry.addSvgIcon('clear', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
    iconRegistry.addSvgIcon('cloud', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud.svg'));
    iconRegistry.addSvgIcon('fire', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fire.svg'));
    iconRegistry.addSvgIcon('fog', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fog.svg'));
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
    iconRegistry.addSvgIcon('open', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/open.svg'));
    iconRegistry.addSvgIcon('rain', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rain.svg'));
    iconRegistry.addSvgIcon('save', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'));
    iconRegistry.addSvgIcon('snow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snow.svg'));
    iconRegistry.addSvgIcon('sun', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sun.svg'));
    iconRegistry.addSvgIcon('technic', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/technic.svg'));
    iconRegistry.addSvgIcon('truck', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/truck.svg'));
  }

  private isGeneralValid(): boolean {
    const formGroup = this.generalReference.form;
    const controls: Array<FormControl> = [];
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key) as FormControl;
      if (control.enabled)
        control.markAsTouched();
      controls.push(control);
    })

    for (let control of controls) {
      if (control.invalid && control.enabled)
        return false;
    }
    return true;
  }

  private isTeamValid(): boolean {
    return this.alarm.team
      .some(member => member.position === 'Einsatzleiter' || member.position === 'Zugskommandant');
  }

  private validateGeneral(): void {
    const formGroup = this.generalReference.form;
    const keys = Object.keys(formGroup.controls);
    for (let key of keys) {
      const control = formGroup.get(key);
      if (control.invalid && control.enabled) {
        const htmlElement = document.querySelector(`[formControlName=${key}]`) as HTMLElement;
        htmlElement?.click();
        return;
      }
    }
  }

  private openPositionErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        disableClose: true,
        panelClass: 'dialog-container',
        lines: [
          'Es muss entweder ein Einsatleiter oder ein Zugskommandant ausgewählt werden.'
        ]
      }
    });
  }
}
