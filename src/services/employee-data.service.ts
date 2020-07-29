import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getVerifiedApplication(): Observable<any> {
    return this.http.get(API_URL + 'verified');
  }

  setApplicationStatus(id: string, obj): Observable<any> {
    return this.http.put(API_URL + 'changeStatus/' + id, obj, {
      responseType: 'text',
    });
  }

  getLatestBullion(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': 'goldapi-2vmu33jykck67ayj-io',
      }),
      redirect: 'follow',
    };

    return this.http.get('https://www.goldapi.io/api/XAU/INR', httpOptions);
  }
}
