import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Alarm } from '../models/alarm';
import { AlarmKeyword } from '../models/alarmKeyword';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  private alarmKeywords: AlarmKeyword;

  constructor(private http: HttpClient) { }

  public testService(): string {
    return "The service worked!";
  }

  public generatePdf(alarm: Alarm) {
    this.http.post(`${environment.restApiUrl}/alarm/pdf`, alarm);
  }

  public getAlarmKeywords(): Observable<AlarmKeyword> {
    return this.http.get<AlarmKeyword>(`${environment.restApiUrl}/keywords`);
  }

}
