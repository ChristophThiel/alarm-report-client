import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Alarm } from './core/alarm.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;

  public alarm: Alarm;
  public alarms: Alarm[] = [];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.initializeIcons(iconRegistry, sanitizer);
  }

  public ngOnInit(): void {
    this.alarm = new Alarm();
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }

  public save(): void {
    alert(this.alarm.startDate);
  }

  private initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    iconRegistry.addSvgIcon('bars', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bars.svg'));
    iconRegistry.addSvgIcon('bolt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bolt.svg'));
    iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg'));
    iconRegistry.addSvgIcon('cloud', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud.svg'));
    iconRegistry.addSvgIcon('fire', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fire.svg'));
    iconRegistry.addSvgIcon('fog', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fog.svg'));
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
    iconRegistry.addSvgIcon('rain', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rain.svg'));
    iconRegistry.addSvgIcon('save', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'));
    iconRegistry.addSvgIcon('snow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snow.svg'));
    iconRegistry.addSvgIcon('sun', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sun.svg'));
    iconRegistry.addSvgIcon('technic', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/technic.svg'));
    iconRegistry.addSvgIcon('truck', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/truck.svg'));
  }
}
