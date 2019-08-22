import { Component, Input, Output } from '@angular/core';
import Order from '../../models/order';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
}

export default OrderListComponent;
