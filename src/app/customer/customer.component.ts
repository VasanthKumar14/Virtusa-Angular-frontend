import { Component, OnInit } from '@angular/core';

import { CustomerDataService } from '../../services/customer-data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(private data: CustomerDataService) {}

  ngOnInit(): void {
    this.data.getCustomerStatus().subscribe((res) => {
      if (res != null) {
        console.log(res);
      }
    });
  }
}
