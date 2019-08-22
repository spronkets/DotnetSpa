import { Component, Input, Output, EventEmitter } from '@angular/core';
import Customer from '../../models/customer';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];

  @Output() selected: EventEmitter<Customer> = new EventEmitter();

  private _selectedCustomer?: Customer;

  get selectedCustomer(): Customer | undefined {
    return this._selectedCustomer;
  }

  selectCustomer(customer: Customer): void {
    if (!this.selectedCustomer || this.selectedCustomer.id !== customer.id) {
      this._selectedCustomer = customer;
    } else {
      this._selectedCustomer = undefined;
    }
    this.selected.emit(this._selectedCustomer);
  }

  isCustomerSelected(customerId: number): boolean {
    return !!this.selectedCustomer && this.selectedCustomer.id === customerId;
  }
}

export default CustomerListComponent;
