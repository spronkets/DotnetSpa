import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Order from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {
  private customerUrl: string = 'http://localhost:5000/api/customer';

  constructor(private http: HttpClient) {}

  getCustomerOrders(customerId: number): Observable<Order[]> {
    const customerOrdersUrl = `${this.customerUrl}/${customerId}/orders`;
    return this.http.get<Order[]>(customerOrdersUrl);
  }
}

export default CustomerOrdersService;
