import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { EmployeeDataService } from '../../services/employee-data.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  loggedIn: boolean;
  infos: Array<object>;

  constructor(
    private data: EmployeeDataService,
    private login: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login.isEmployeeLoggedIn().subscribe((res) => {
      this.loggedIn = res.valueOf();
      console.log(this.loggedIn);
      if (this.loggedIn == false) {
        this.router.navigateByUrl('/');
      }
    });
    this.getPending();
  }

  getPending(): void {
    this.data.getPendingApplication().subscribe((res) => {
      if (res != null) {
        this.infos = res;
        console.log(this.infos);
      }
    });
  }
}
