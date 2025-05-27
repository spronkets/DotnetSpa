import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Order from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {
  private baseUrl: string = 'https://localhost:44314/api/';

  constructor(private http: HttpClient) {}

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customer/${customerId}/orders`);
  }
}

export default CustomerOrdersService;
