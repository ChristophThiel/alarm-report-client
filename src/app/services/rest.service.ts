import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Alarm } from '../models/alarm';

@Injectable()
export class RestService {

  constructor(private _http: HttpClient) { }

  public testService(): string {
    return "The service worked!";
  }

  public generatePdf(alarm: Alarm) {
    this._http.post(`${environment.restApiUrl}/alarm/pdf`, alarm).subscribe(data => alert(data as string));
  }

}
