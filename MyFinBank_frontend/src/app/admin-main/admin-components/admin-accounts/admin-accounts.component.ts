import { Component } from '@angular/core';
import { AccountService } from '../../admin-services/account.service';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent {

  accounts: any[] = [];
  editedAccount: any = {}; // Variable to hold edited account data
  isEditFormOpen: boolean = false;
  isCreateFormOpen: boolean = false;
  newAccount: any = {
    email: '',
    account_type: '',
    balance: ''
  };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }


  openCreateAccountForm() {
    this.isCreateFormOpen = true;
  }

  closeCreateAccountForm() {
    this.isCreateFormOpen = false;
  }

  createAccount(): void {
    this.accountService.createAccount(this.newAccount)
      .subscribe(
        response => {
          console.log('Account created successfully:', response);
          // Perform any additional actions after account creation if needed
          // Reset form fields after successful creation
          this.newAccount = {
            email: '',
            account_type: '',
            balance: ''
          };
          // Close the create form after successful creation
          this.isCreateFormOpen = false;
          // Refresh the accounts list
          this.getAllAccounts();
        },
        error => {
          console.error('Error creating account:', error);
          console.log(error.message)
          if(error.message == 'Http failure response for http://localhost:8000/accounts: 404 Not Found'){
            alert("Invalid Details")
          } else if(error.message == 'Http failure response for http://localhost:8000/accounts: 409 Conflict'){
            alert("For Admins Account creation not allowed");
          }else{
            alert("user already hs account");
          }
          
          // Handle error appropriately
        }
      );
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts()
      .subscribe(
        (data: any[]) => {
          this.accounts = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  toggleEditForm(account: any): void {
    // Toggle the visibility of the edit form for the clicked account
    this.isEditFormOpen = !this.isEditFormOpen;
    this.editedAccount = { ...account }; // Set the edited account data
  }

  saveEditedAccount(): void {
    // Call the service method to update the account with edited data
    this.accountService.updateAccount(this.editedAccount._id, this.editedAccount)
      .subscribe(
        response => {
          console.log('Account updated successfully:', response);
          // Close the edit form after successful update
          this.isEditFormOpen = false;
          // Refresh the accounts list
          this.getAllAccounts();
        },
        error => {
          console.error('Error updating account:', error);
          // Handle error appropriately
        }
      );
  }

  closeEditForm(): void {
    // Close the edit form
    this.isEditFormOpen = false;
  }

  deleteAccount(accountId: string): void {
    this.accountService.deleteAccount(accountId)
      .subscribe(
        response => {
          alert('Account deleted successfully');
          this.getAllAccounts();
        },
        error => {
          console.error('Error deleting account:', error);
        }
      );
  }
}
