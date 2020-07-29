import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CustomerDataService } from '../../services/customer-data.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  loggedIn: boolean;
  kn: string;
  refid: string;
  imageUrl: string;
  result: string;
  amount: string;
  msg: string;
  imageError: boolean = false;
  loading: boolean = false;

  aadharStatus: boolean = false;
  formStatus: boolean = false;
  imageStatus: boolean = false;
  resultStatus: boolean = false;

  selectedFile: FileList;
  currentFile: File;

  constructor(
    private data: CustomerDataService,
    private login: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  @ViewChild('stepper') private myStepper: MatStepper;

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
        if (res.kn == null) {
          this.myStepper.selectedIndex = 0;
        } else if (res.refid == null) {
          this.aadharStatus = true;
          this.kn = res.kn;
          this.secondFormGroup.get('kn').setValue(this.kn);
          this.myStepper.selectedIndex = 1;
        } else if (res.result === 'imagePending') {
          this.aadharStatus = true;
          this.formStatus = true;
          this.kn = res.kn;
          this.secondFormGroup.get('kn').setValue(this.kn);
          this.refid = res.refid;
          this.result = res.result;
          this.myStepper.selectedIndex = 2;
        } else if (res.result === 'yes' || res.result === 'no') {
          this.refid = res.refid;
          if (res.result === 'yes') {
            this.msg =
              'Your Response has Successfully been Submitted , Very Soon amount will be deposited to your Bank Account';
          } else {
            this.msg =
              'Your Response has Successfully been Submitted , You can get back you jewel from the Bank after paying the Service Charge of Rs.500';
          }
          this.myStepper.selectedIndex = 3;
        } else {
          this.result = res.result;
          this.aadharStatus = true;
          this.formStatus = true;
          this.imageStatus = true;
          this.kn = res.kn;
          this.refid = res.refid;
          this.myStepper.selectedIndex = 3;
        }
        console.log(res);
        console.log(this.myStepper.selectedIndex);
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
      kn: ['', [Validators.required]],
      goldtype: ['8', [Validators.required]],
      weight: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      place: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      jewelers_name: ['', [Validators.required]],
      jewelers_address: ['', [Validators.required]],
      accHolder: ['', [Validators.required]],
      jointAcc: ['no', [Validators.required]],
      accType: ['SA', [Validators.required]],
      accNum: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      declaration: ['', [Validators.requiredTrue]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      result: ['', [Validators.required]],
    });
  }

  get aadhar() {
    return this.firstFormGroup.get('aadhar');
  }

  get gtype() {
    return this.secondFormGroup.get('goldtype');
  }

  aadharSubmission() {
    console.log(this.firstFormGroup.value);
    this.data.KYCVerification(this.firstFormGroup.value).subscribe(
      (res: any) => {
        if (res != null) {
          this.kn = String(res);
          console.log(this.kn);
          this.secondFormGroup.get('kn').setValue(this.kn);
          this.myStepper.next();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSubmission() {
    console.log(this.secondFormGroup.value);
    this.data.formUpload(this.secondFormGroup.value).subscribe(
      (res: any) => {
        if (res != null) {
          this.refid = String(res);
          this.myStepper.next();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectFile(event) {
    this.selectedFile = event.target.files;
  }

  upload() {
    this.loading = true;
    this.currentFile = this.selectedFile.item(0);
    this.data.uploadImage(this.currentFile).subscribe(
      (res) => {
        if (res != null) {
          console.log(res);
          this.imageUrl = encodeURI(res.imageUrl);
          console.log(this.imageUrl);
          this.imageError = false;
          this.loading = false;
          this.result = 'pending';
        }
      },
      (error) => {
        this.imageError = true;
      }
    );
  }

  checkAmount() {
    this.loading = true;
    this.data.getAmount().subscribe(
      (res) => {
        if (res != null) {
          this.amount = String(res);
          this.loading = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resultSubmission() {
    console.log(this.thirdFormGroup.value);
    this.loading = true;
    this.data.setResult(this.thirdFormGroup.value).subscribe((res) => {
      if (res === 'Done') {
        this.loading = false;
        this.msg = 'Your Response has Successfully been Submitted';
      }
    });
  }
}
