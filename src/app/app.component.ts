import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Alarm } from './shared/alarm.model';
import { CommunicatorService } from './shared/communicator.service';
import { GeneralComponent } from './general/general.component';
import { TeamComponent } from './team/team.component';
import { ProtocolComponent } from './protocol/protocol.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public alarm: Alarm;

  @ViewChild('general') generalReference: GeneralComponent;
  @ViewChild('team') teamReference: TeamComponent;
  @ViewChild('protocol') protocolReference: ProtocolComponent;

  constructor(private communicator: CommunicatorService, private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
    this.initializeIcons(iconRegistry, sanitizer);
  }

  public ngOnInit(): void {
    this.alarm = new Alarm();
  }

  public new(): void {
    // TODO: Reset values in intpus
    this.alarm = new Alarm();
    this.initializeForms();
  }

  public open(): void {
    this.communicator.openFile()
      .then(result => {
        this.alarm = JSON.parse(result.toString());
        this.initializeForms();
      });
  }

  // This function creates the .rep file
  public save(): void {
    this.communicator.saveFile(this.alarm);
  }

  // This function creates the pdf
  public finish(): void { }

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
}
