import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  customers: any[] = [];
  editedCustomer: any = {};
  isEditFormOpen: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.adminService.getCustomers().subscribe(
      (data: any[]) => {
        this.customers = data;
        // console.log(this.customers);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editCustomer(customer: any) {
    // Extract only the necessary properties from the customer object
    this.editedCustomer = {
        "id":customer._id,
        "username": customer.username,
        "email": customer.email,
        "isAdmin": customer.isAdmin,
        "isActive": customer.isActive
    };
    // console.log(this.editedCustomer);
    this.isEditFormOpen = true;
}

  saveCustomer() {
    // Call your editCustomer function here with the updated data
    this.adminService.editCustomerById(this.editedCustomer.id, this.editedCustomer).subscribe(
      (response) => {
        console.log('Customer updated successfully:', response);
        // After saving, close the popup form
        this.isEditFormOpen = false;
        // Optionally, you can reload the customers list or update the UI as needed
        this.loadCustomers();
      },
      (error) => {
        console.error('Error updating customer:', error);
      }
    );
  }

  // Close the popup form
  closePopup() {
    this.isEditFormOpen = false;
  }
}
