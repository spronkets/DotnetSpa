import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { type Customer, type MergeCustomer } from "../models";

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  private baseUrl: string = "https://localhost:44314/api";

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }

  updateCustomer(id: number, data: MergeCustomer): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/customer/${id}`, data);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/customer/${customerId}`);
  }
}

export default CustomersService;
