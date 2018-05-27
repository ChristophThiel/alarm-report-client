import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class RestService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public testService(): string {
    return "The service worked!";
  }

}
