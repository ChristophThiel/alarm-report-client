import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private ipcRenderer: IpcRenderer | undefined;

  constructor() {
    try {
      this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
    } catch (e) {
      console.error('Could not load ipcRenderer');
    }
  }

  public openFile(): Promise<any> {
    this.ipcRenderer.send('open');
    return new Promise<any>(resolve => {
      this.ipcRenderer.on('open-reply', (event, args) => {
        resolve(args);
      });
    })
  }

  public saveFile(alarm: any) {
    this.ipcRenderer.send('save', alarm);
  }
}
