import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Order from '../../models/order';

@Component({
  selector: 'customer-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-orders.component.html'
})
export class CustomerOrdersComponent {
  @Input() orders: Order[] = [];
}

export default CustomerOrdersComponent;
