import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  public loggedInUser: string;

  public loginError = new BehaviorSubject(false);
  public employeeRole: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient,
    private storage: TokenStorageService,
    private authService: SocialAuthService,
    private _snackBar: MatSnackBar
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
            this.loggedInUser = user.name;
            this.CustomerLoggedin.next(true);
            this.openSnackBar();
          }
        },
        (error) => console.log(error)
      );
  }

  isCustomerLoggedIn(): Observable<boolean> {
    return this.CustomerLoggedin.asObservable();
  }

  logoutCustomer(): void {
    this.loggedInUser = null;
    this.storage.signOut();
    this.authService.signOut();
    this.CustomerLoggedin.next(false);
  }

  loginEmployee(credentials): void {
    this.storage.signOut();
    this.http
      .post(
        AUTH_API + 'employee/authenticate',
        {
          username: credentials.username,
          password: credentials.password,
        },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(
        (res: any) => {
          if (res.token != null) {
            this.storage.saveToken(res.token);
            this.employeeRole = res.role;
            this.loggedInUser = credentials.username;
            this.EmployeeLoggedin.next(true);
            this.loginError.next(false);
            this.openSnackBar();
          }
          console.log(res);
        },
        (error) => {
          this.loginError.next(true);
        }
      );
  }

  isEmployeeLoggedIn(): Observable<boolean> {
    return this.EmployeeLoggedin.asObservable();
  }

  isLoginError(): Observable<boolean> {
    return this.loginError.asObservable();
  }

  EmployeeRole(): string {
    return this.employeeRole;
  }

  logoutEmployee(): void {
    this.loggedInUser = null;
    this.storage.signOut();
    this.EmployeeLoggedin.next(false);
  }

  openSnackBar() {
    this._snackBar.open('Login Successfull!!', 'End now', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
