import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginCustomer(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + '/customer/login',
      {
        username: credentials.username,
        gid: credentials.gid,
        email_id: credentials.email,
      },
      httpOptions
    );
  }

  loginEmployee(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + '/employee/authenticate',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }
}
