import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private authService: SocialAuthService,
    private login: AuthService,
    private storage: TokenStorageService,
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
      if (this.customerloggedIn == true) {
        if (this.login.EmployeeRole() == 'verify') {
          this.router.navigateByUrl('/verification');
        } else {
          this.router.navigateByUrl('/review');
        }
      }
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
}
