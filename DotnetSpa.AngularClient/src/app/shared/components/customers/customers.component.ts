import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Customer from '../../models/customer';

@Component({
  selector: 'customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
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

export default CustomersComponent;
