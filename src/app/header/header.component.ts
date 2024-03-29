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
  userName: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.authService.isCustomerLoggedIn().subscribe((res) => {
      this.isCustomerLoggedIn = res.valueOf();
      console.log(this.isCustomerLoggedIn);
      if (this.isCustomerLoggedIn == true) {
        console.log(this.authService.loggedInUser);
        this.userName = this.authService.loggedInUser;
      }
    });
    this.authService.isEmployeeLoggedIn().subscribe((res) => {
      this.isEmployeeLoggedIn = res.valueOf();
      if (this.isEmployeeLoggedIn == true) {
        this.userName = this.authService.loggedInUser;
      }
    });
  }

  customerLogout() {
    this.userName = null;
    this.authService.logoutCustomer();
    this.router.navigateByUrl('/login');
    this.openSnackBar();
    console.log('Customer Logged Out');
  }

  employeeLogout() {
    this.userName = null;
    this.authService.logoutEmployee();
    this.router.navigateByUrl('/login');
    this.openSnackBar();
    console.log('Employee Logged Out');
  }

  openSnackBar() {
    this._snackBar.open('Logout Successfull!!', 'End now', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
