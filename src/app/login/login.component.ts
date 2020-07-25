import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  customerloggedIn: boolean;
  employeeloggedIn: boolean;
  loginError: boolean;

  loginFormGroup: FormGroup;

  constructor(
    private authService: SocialAuthService,
    private login: AuthService,
    private storage: TokenStorageService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.login.isCustomerLoggedIn().subscribe((res) => {
      this.customerloggedIn = res.valueOf();
      if (this.customerloggedIn == true) {
        this.router.navigateByUrl('/customer');
      }
    });

    this.login.isEmployeeLoggedIn().subscribe((res) => {
      this.employeeloggedIn = res.valueOf();
      if (this.employeeloggedIn === true) {
        if (this.login.EmployeeRole() === 'verify') {
          this.router.navigateByUrl('/verification');
        } else {
          this.router.navigateByUrl('/review');
        }
      }
    });

    this.login.isLoginError().subscribe((res) => {
      this.loginError = res.valueOf();
    });

    this.loginFormGroup = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user != null) {
        this.login.loginCustomer(user);
      }
    });
  }

  employeeLogin(): void {
    console.log(this.loginFormGroup.value);
    this.login.loginEmployee(this.loginFormGroup.value);
  }
}
