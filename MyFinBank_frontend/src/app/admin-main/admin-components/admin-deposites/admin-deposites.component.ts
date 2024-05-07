import { Component, OnInit } from '@angular/core';
import { AdminDepositService } from '../../admin-services/admin-deposites.service';
import { TransactionService } from '../../admin-services/transaction.service';

@Component({
  selector: 'app-admin-deposites', // Corrected selector name to match HTML
  templateUrl: './admin-deposites.component.html', // Corrected HTML file name
  styleUrls: ['./admin-deposites.component.css']
})
export class AdminDepositesComponent implements OnInit {

  userId: String = ""

  newFixedDeposit: any = {
    account_id: '',
    deposit_amount: 0,
    interest_rate: 0,
    status: ''
  };

  updatedFixedDeposit: Partial<any> = {};

  fixedDeposits: any[] = [];

  newRecurringDeposit: any = {
    account_id: '',
    deposit_amount: 0,
    interest_rate: 0,
    status: ''
  };

  updatedRecurringDeposit: Partial<any> = {};

  recurringDeposits: any[] = [];

  constructor(
    private depositService: AdminDepositService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      // Retrieve user data from session storage
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.userId = userData.userId;
      }
    }
    this.getAllFixedDeposits();
    this.getAllRecurringDeposits();
  }

  createFixedDeposit() {
    console.log(this.newFixedDeposit); // Corrected logging
    this.depositService.createFixedDeposit(this.newFixedDeposit).subscribe(
      (response) => {
        console.log('Fixed deposit created successfully:', response);


        const transactionObj = {
          user_id: this.userId,
          account_id: this.newFixedDeposit.account_id, // Corrected account_id
          transaction_type: "FD credit", // Corrected transaction_type
          amount: this.newFixedDeposit.deposit_amount,
          receiver_acc: "Not Applicable",
          status: "success"
        };
        this.transactionService.createTransaction(transactionObj).subscribe(
          () => {
            alert('FD Transaction Successful');
          },
          (error) => {
            console.error('Error creating fixed deposit transaction', error);
          }
        );

        this.getAllFixedDeposits(); // Refresh the list of fixed deposits
        this.newFixedDeposit = {
          account_id: '',
          deposit_amount: 0,
          interest_rate: 0,
          status: ''
        };

      },
      (error) => {
        console.error('Error creating fixed deposit:', error);
      }
    );
  }

  getAllFixedDeposits() {
    this.depositService.getAllFixedDeposits().subscribe(
      (response) => {
        console.log('Fixed deposits fetched successfully:', response);
        this.fixedDeposits = response;
      },
      (error) => {
        console.error('Error fetching fixed deposits:', error);
      }
    );
  }

  updateFixedDeposit(id: string, updatedData: Partial<any>) {
    this.depositService.updateFixedDeposit(id, updatedData).subscribe(
      (response) => {
        console.log('Fixed deposit updated successfully:', response);
        this.getAllFixedDeposits(); // Refresh the list of fixed deposits
      },
      (error) => {
        console.error('Error updating fixed deposit:', error);
      }
    );
  }

  deleteFixedDeposit(id: string) {
    this.depositService.deleteFixedDeposit(id).subscribe(
      () => {
        console.log('Fixed deposit deleted successfully');
        this.getAllFixedDeposits(); // Refresh the list of fixed deposits
      },
      (error) => {
        console.error('Error deleting fixed deposit:', error);
      }
    );
  }

  createRecurringDeposit() {
    this.depositService.createRecurringDeposit(this.newRecurringDeposit).subscribe(
      (response) => {
        console.log('Recurring deposit created successfully:', response);

        const transactionObj = {
          user_id: this.userId,
          account_id: this.newRecurringDeposit.account_id, // Corrected account_id
          transaction_type: "RD credit", // Corrected transaction_type
          amount: this.newRecurringDeposit.deposit_amount,
          receiver_acc: "Not Applicable",
          status: "success"
        };
        this.transactionService.createTransaction(transactionObj).subscribe(
          () => {
            alert('RD Transaction Successful')
          }, (error) => {
            console.error('Error reccuring deposit transaction', error);
          }
        )

        this.getAllRecurringDeposits(); // Refresh the list of recurring deposits
        this.newRecurringDeposit = {
          account_id: '',
          deposit_amount: 0,
          interest_rate: 0,
          status: ''
        };

      },
      (error) => {
        console.error('Error creating recurring deposit:', error);
      }
    );
  }

  getAllRecurringDeposits() {
    this.depositService.getAllRecurringDeposits().subscribe(
      (response) => {
        console.log('Recurring deposits fetched successfully:', response);
        this.recurringDeposits = response;
      },
      (error) => {
        console.error('Error fetching recurring deposits:', error);
      }
    );
  }


  deleteRecurringDeposit(id: string) {
    this.depositService.deleteRecurringDeposit(id).subscribe(
      () => {
        console.log('Recurring deposit deleted successfully');
        this.getAllRecurringDeposits(); // Refresh the list of recurring deposits
      },
      (error) => {
        console.error('Error deleting recurring deposit:', error);
      }
    );
  }


  // updating deposite
  isRDUpadteFormOpen: boolean = false;
  selectedDeposit: any = {}; // Initialize with an empty object

  // Method to toggle the visibility of the update deposit form and populate the selected deposit
  toggleUpdateDepositForm(deposit: any): void {
    this.selectedDeposit = { ...deposit }; // Copy the selected deposit to prevent modifying the original object
    this.isRDUpadteFormOpen = true;
  }
  closeUpdateDepositForm() {
    this.isRDUpadteFormOpen = false;
  }

  // Update RD Form
  isRDUpdateFormOpen: boolean = false;
  selectedRD: any = {};

  toggleUpdateRDForm(deposit: any): void {
    this.selectedRD = { ...deposit };
    this.isRDUpdateFormOpen = true;
  }

  closeUpdateRDForm() {
    this.isRDUpdateFormOpen = false;
  }

  updateRD() {
    const updatedData = {
      account_id: this.selectedRD.account_id,
      deposit_amount: this.selectedRD.deposit_amount,
      interest_rate: this.selectedRD.interest_rate,
      status: this.selectedRD.status,
    };
    this.depositService.updateRecurringDeposit(this.selectedRD._id, updatedData).subscribe(
      (response) => {
        console.log('Recurring deposit updated successfully');
        this.getAllRecurringDeposits();
        this.isRDUpdateFormOpen = false;
      },
      (error) => {
        console.error('Error updating recurring deposit:', error);
      }
    );
  }

  // Update FD Form
  isFDUpdateFormOpen: boolean = false;
  selectedFD: any = {};

  toggleUpdateFDForm(deposit: any): void {
    this.selectedFD = { ...deposit };
    this.isFDUpdateFormOpen = true;
  }

  closeUpdateFDForm() {
    this.isFDUpdateFormOpen = false;
  }

  updateFD() {
    const updatedData = {
      account_id: this.selectedFD.account_id,
      deposit_amount: this.selectedFD.deposit_amount,
      interest_rate: this.selectedFD.interest_rate,
      status: this.selectedFD.status,
    };
    this.depositService.updateFixedDeposit(this.selectedFD._id, updatedData).subscribe(
      (response) => {
        console.log('Fixed deposit updated successfully');
        this.getAllFixedDeposits();
        this.isFDUpdateFormOpen = false;
      },
      (error) => {
        console.error('Error updating fixed deposit:', error);
      }
    );
  }
}
