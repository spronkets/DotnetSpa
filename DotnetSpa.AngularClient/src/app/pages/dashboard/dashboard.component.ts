import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CustomerListComponent,
  OrderListComponent,
} from '../../shared/components';
import { Customer, Order } from '../../shared/models';
import { CustomerOrdersService, CustomersService } from '../../shared/services';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, OrderListComponent, CustomerListComponent],
})
export class DashboardComponent implements OnInit {
  customers$: Observable<Customer[]> = of([]);
  customerOrders$: Observable<Order[]> = of([]);
  customerId: Number | undefined = undefined;

  constructor(
    private customersService: CustomersService,
    private customerOrdersService: CustomerOrdersService
  ) { }

  ngOnInit(): void {
    this.customers$ = this.customersService.getCustomers();
  }

  customerSelected(customer?: Customer): void {
    if (customer && customer.id) {
      this.customerOrders$ = this.customerOrdersService.getCustomerOrders(customer.id);
      this.customerId = customer.id;
    } else {
      this.customerOrders$ = of([]);
      this.customerId = undefined;
    }
  }
}
