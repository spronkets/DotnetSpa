import { Component, OnInit } from '@angular/core';

import { Customer, Order } from '../../shared/models';
import { CustomersService, CustomerOrdersService } from '../../shared/services';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loadingCustomers: boolean = false;
  shouldShowCustomerOrders: boolean = false;
  loadingCustomerOrders: boolean = false;

  customers: Customer[] = [];
  customerOrders: Order[] = [];

  constructor(
    private customersService: CustomersService,
    private customerOrdersService: CustomerOrdersService
  ) {}

  ngOnInit(): void {
    this.refreshCustomers();
  }

  customerSelected(customer?: Customer): void {
    if (customer && customer.id) {
      this.shouldShowCustomerOrders = true;
      this.refreshCustomerOrders(customer.id);
    } else {
      this.shouldShowCustomerOrders = false;
      this.customerOrders = [];
    }
  }

  private refreshCustomers(): void {
    this.loadingCustomers = true;
    this.customersService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.loadingCustomers = false;
    });
  }

  private refreshCustomerOrders(customerId: number): void {
    this.loadingCustomerOrders = true;
    this.customerOrdersService
      .getCustomerOrders(customerId)
      .subscribe((customers: Customer[]) => {
        this.customerOrders = customers;
        this.loadingCustomerOrders = false;
      });
  }
}
