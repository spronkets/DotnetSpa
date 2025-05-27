import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import Customer from "../../models/customer";
import { CustomersService } from "../../services";

@Component({
  selector: "edit-customer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class EditCustomerComponent {
  @Input() customer!: Customer;

  showDialog = false;
  formCustomer: Customer = {} as Customer;

  constructor(private customersService: CustomersService) {}

  show(): void {
    this.formCustomer = { ...this.customer };
    this.showDialog = true;
  }

  hide(): void {
    this.showDialog = false;
  }

  saveChanges(): void {
    const id = this.formCustomer.id;
    this.customersService
      .updateCustomer(id, this.formCustomer)
      .subscribe(() => {
        Object.assign(this.customer, this.formCustomer);
        this.hide();
      });
  }
}

export default EditCustomerComponent;
