import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Customer from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customersUrl: string = 'https://localhost:44314/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }
}

export default CustomersService;
