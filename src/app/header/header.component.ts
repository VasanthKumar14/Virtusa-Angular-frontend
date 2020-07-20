import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  title = 'frontend';
  isLogged: boolean = false;

  ngOnInit(): void {
    this.authService.isCustomerLoggedIn().subscribe((res) => {
      this.isLogged = res.valueOf();
    });
  }

  logout() {
    this.authService.logoutCustomer();
    this.router.navigateByUrl('/login');
    console.log('Logged Out');
  }
}
