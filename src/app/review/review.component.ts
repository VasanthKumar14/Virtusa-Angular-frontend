import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from '../../services/auth.service';
import { EmployeeDataService } from '../../services/employee-data.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  loggedIn: boolean;
  infos: Array<object>;

  displayedColumns: string[] = ['id', 'name', 'refid', 'weight'];
  dataSource: MatTableDataSource<object>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
    this.getVerified();
  }

  getVerified(): void {
    this.data.getVerifiedApplication().subscribe((res) => {
      if (res != null) {
        this.infos = res;
        this.dataSource = new MatTableDataSource(this.infos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.infos);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(obj: any): void {
    this.router.navigate(['/application', obj.id]);
  }
}
