import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CustomerDataService } from '../../services/customer-data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loggedIn: boolean;

  constructor(
    private data: CustomerDataService,
    private login: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login.isCustomerLoggedIn().subscribe((res) => {
      this.loggedIn = res.valueOf();
      console.log(this.loggedIn);
      if (this.loggedIn == false) {
        this.router.navigateByUrl('/');
      }
    });

    this.data.getCustomerStatus().subscribe((res) => {
      if (res != null) {
        console.log(res);
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      aadhar: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
    });
    this.secondFormGroup = this._formBuilder.group({
      KN: ['', [Validators.required]],
      goldtype: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      place: ['', [Validators.required]],
      jewelers_name: ['', [Validators.required]],
      jewelers_address: ['', [Validators.required]],
      accHolder: ['', [Validators.required]],
      jointAcc: ['', [Validators.required]],
      accType: ['', [Validators.required]],
      accNum: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      declaration: ['', [Validators.requiredTrue]],
    });
  }

  get aadhar() {
    return this.firstFormGroup.get('aadhar');
  }

  aadharSubmission() {
    console.log(this.firstFormGroup.value);
  }
}
