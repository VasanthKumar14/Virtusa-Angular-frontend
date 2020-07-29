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
  amountLoading: boolean = false;
  price: number;

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
    this.loading = true;
    let response = {
      status: 'verified',
    };
    this.data.setApplicationStatus(this.id, response).subscribe((res) => {
      this.loading = false;
      this.router.navigateByUrl('/');
    });
  }

  rejectApplication(): void {
    console.log('reject');
    this.loading = true;
    let response: object = {
      status: 'rejected',
    };
    this.data.setApplicationStatus(this.id, response).subscribe((res) => {
      this.loading = false;
      this.router.navigateByUrl('/');
    });
  }

  callAPI(): void {
    this.amountLoading = true;
    this.data.getLatestBullion().subscribe((res) => {
      this.price = res['price'] / 28.3495;
      let weight = parseInt(this.application.weight);
      let goldType = parseInt(this.application.goldtype);
      this.price *= weight;
      this.price *= goldType / 24;
      this.price *= parseInt(this.amountForm.get('goldQualityIndex').value) / 5;
      this.price = Math.round(this.price);
      this.amountLoading = false;
    });
  }

  reviewedApplication(): void {
    console.log('Reviewed');
    this.loading = true;
    let response: object = {
      status: 'reviewed',
      amount: this.price,
      goldQualityIndex: parseInt(this.amountForm.get('goldQualityIndex').value),
    };
    this.data.setApplicationStatus(this.id, response).subscribe((res) => {
      this.loading = false;
      this.router.navigateByUrl('/');
    });
  }
}
