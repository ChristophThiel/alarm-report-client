import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public uploadFile(file: any): void {
    const formData: FormData = new FormData();
    formData.append(file.name, file, file.name);
    // this.http.post(`assets/configurations/${file.name}`, formData);
    this.http.post(`assets/configurations/${file.name}`, formData).subscribe(data => {
      alert(data);
    });
  }

}
