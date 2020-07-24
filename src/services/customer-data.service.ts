import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/customer/';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  getCustomerStatus(): Observable<any> {
    return this.http.get(API_URL + 'status');
  }

  KYCVerification(obj: object): Observable<any> {
    return this.http.post(API_URL + 'idverify', obj, { responseType: 'text' });
  }

  formUpload(obj: object): Observable<any> {
    return this.http.post(API_URL + 'formupload', obj, {
      responseType: 'text',
    });
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log(formData.get('file'));

    return this.http.post(API_URL + 'imageupload', formData);
  }

  getAmount(): Observable<any> {
    return this.http.get(API_URL + 'amount', { responseType: 'text' });
  }

  setResult(obj: object): Observable<any> {
    return this.http.put(API_URL + 'setResult', obj, { responseType: 'text' });
  }
}
