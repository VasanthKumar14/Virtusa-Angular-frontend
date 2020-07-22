import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(API_URL + 'idverify', obj);
  }

  formUpload(obj: object): Observable<any> {
    return this.http.post(API_URL + 'formupload', obj);
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
