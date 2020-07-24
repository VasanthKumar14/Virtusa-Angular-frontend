import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:4000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public CustomerLoggedin = new BehaviorSubject(false);
  public EmployeeLoggedin = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: TokenStorageService,
    private authService: SocialAuthService
  ) {}

  loginCustomer(user: SocialUser): void {
    this.storage.signOut();
    this.http
      .post(
        AUTH_API + 'customer/login',
        {
          username: user.name,
          gid: user.id,
          email_id: user.email,
        },
        httpOptions
      )
      .subscribe(
        (res: any) => {
          if (res.token != null) {
            this.storage.saveToken(res.token);
            this.CustomerLoggedin.next(true);
          }
        },
        (error) => console.log(error)
      );
  }

  isCustomerLoggedIn(): Observable<boolean> {
    return this.CustomerLoggedin.asObservable();
  }

  logoutCustomer(): void {
    console.log(this.storage.getToken());
    this.storage.signOut();
    console.log(this.storage.getToken());
    this.authService.signOut();
    this.CustomerLoggedin.next(false);
  }

  loginEmployee(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'employee/authenticate',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  public isEmployeeLoggedIn(): Observable<boolean> {
    return this.EmployeeLoggedin.asObservable();
  }
}
