import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  title = 'frontend';
  isCustomerLoggedIn: boolean = false;
  isEmployeeLoggedIn: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.authService.isCustomerLoggedIn().subscribe((res) => {
      this.isCustomerLoggedIn = res.valueOf();
    });
    this.authService.isEmployeeLoggedIn().subscribe((res) => {
      this.isEmployeeLoggedIn = res.valueOf();
    });
  }

  customerLogout() {
    this.authService.logoutCustomer();
    this.router.navigateByUrl('/login');
    this.openSnackBar();
    console.log('Customer Logged Out');
  }

  employeeLogout() {
    this.authService.logoutEmployee();
    this.router.navigateByUrl('/login');
    this.openSnackBar();
    console.log('Employee Logged Out');
  }

  openSnackBar() {
    this._snackBar.open('Logout Successfull!!', 'End now', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
