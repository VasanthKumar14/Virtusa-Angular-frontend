import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { EmployeeDataService } from '../../services/employee-data.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  loggedIn: boolean;
  application: any;
  loading: boolean = false;

  amountForm: FormGroup;

  id: string;

  constructor(
    private routeParam: ActivatedRoute,
    private data: EmployeeDataService,
    private login: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
    this.routeParam.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.login.isEmployeeLoggedIn().subscribe((res) => {
      this.loggedIn = res.valueOf();
      if (this.loggedIn == false) {
        this.router.navigateByUrl('/');
      }
    });
    this.getApplication();

    this.amountForm = this._formBuilder.group({
      goldQualityIndex: ['3', [Validators.required]],
    });
  }

  getApplication(): void {
    this.data.getCustomerApplication(this.id).subscribe((res) => {
      if (res != null) {
        this.application = res;
      }
    });
  }

  verfiyApplication(): void {
    console.log('verify');
    let response = {
      status: 'verified',
    };
    this.data.setApplicationStatus(this.id, response);
    this.router.navigateByUrl('/');
  }

  rejectApplication(): void {
    console.log('reject');
    let response: object = {
      status: 'rejected',
    };
    this.data.setApplicationStatus(this.id, response);
    this.router.navigateByUrl('/');
  }

  reviewedApplication(): void {
    console.log('reviewed');
    this.data.getLatestBullion().subscribe((res) => {
      console.log(res);
    });
  }
}
