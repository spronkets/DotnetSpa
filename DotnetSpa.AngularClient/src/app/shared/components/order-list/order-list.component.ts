import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Order from '../../models/order';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html'
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
}

export default OrderListComponent;
