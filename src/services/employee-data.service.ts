import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/employee/';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  constructor(private http: HttpClient) {}

  getPendingApplication(): Observable<any> {
    return this.http.get(API_URL + 'pending');
  }

  getCustomerApplication(id: string): Observable<any> {
    return this.http.get(API_URL + 'application/' + id, {
      responseType: 'json',
    });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
