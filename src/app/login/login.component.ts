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
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private login: AuthService,
    private storage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.loggedIn = user != null;
      if (this.loggedIn == true) {
        this.router.navigateByUrl('/customer');
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn == true) {
        this.login.loginCustomer(user).subscribe(
          (res) => {
            if (res.token != null) {
              this.storage.saveToken(res.token);
            }
          },
          (error) => console.log(error)
        );
      }
    });
  }

  signOut(): void {
    console.log(this.storage.getToken());
    this.storage.signOut();
    console.log(this.storage.getToken());
    this.authService.signOut();
  }
}
