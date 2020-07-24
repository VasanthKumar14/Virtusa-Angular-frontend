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
  isCustomerLoggedIn: boolean = false;
  isEmployeeLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isCustomerLoggedIn().subscribe((res) => {
      this.isCustomerLoggedIn = res.valueOf();
    });
  }

  customerLogout() {
    this.authService.logoutCustomer();
    this.router.navigateByUrl('/login');
    console.log('Customer Logged Out');
  }

  employeeLogout() {
    this.authService.logoutEmployee();
    this.router.navigateByUrl('/login');
    console.log('Employee Logged Out');
  }
}
