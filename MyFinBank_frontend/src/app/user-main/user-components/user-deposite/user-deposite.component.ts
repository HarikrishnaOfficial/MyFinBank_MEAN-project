import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../user-services/user-account.service';
import { UserDepositService } from '../../user-services/user-deposit.service';
import { AdminDepositService } from '../../../admin-main/admin-services/admin-deposites.service'
import { UserTransactionsService } from '../../user-services/user-transactions.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-deposite',
  templateUrl: './user-deposite.component.html',
  styleUrls: ['./user-deposite.component.css']
})
export class UserDepositeComponent implements OnInit {
  errorMessage: string = "";
  amountTopay: Number = 0;
  userId: string = "";
  accounts: any[] = [];
  fixedDeposits: any[] = [];
  recurringDeposits: any[] = [];

  constructor(
    private userAccountService: UserAccountService,
    private userDepositService: UserDepositService,
    private depositService: AdminDepositService,
    private transactionService: UserTransactionsService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    // Retrieve userId from local storage
    if (typeof sessionStorage !== 'undefined') {
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.userId = userData.userId;

        this.fetchAccounts();
      }
    }
  }

  fetchAccounts(): void {
    this.userAccountService.getUserAccounts(this.userId).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.accounts = response;
          // Call fetchDeposits here after accounts are fetched
          this.fetchDeposits();
        }
      },
      (error) => {
        console.error('Error fetching user accounts:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to fetch accounts. Please try again later', duration: 5000 });
      }
    );
  }


  fetchDeposits(): void {
    const account = this.accounts[0]
    console.log(this.accounts[0]._id)
    this.userDepositService.getFixedDepositsByAccountId(account._id).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.fixedDeposits = response;
        }
      },
      (error) => {
        console.error('Error fetching fixed deposits:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to fetch fixed deposits', duration: 5000 });
      }
    );

    this.userDepositService.getRecurringDepositsByAccountId(account._id).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.recurringDeposits = response;
        }
      },
      (error) => {
        console.error('Error fetching recurring deposits:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to fetch recurring deposits', duration: 5000 });
      }
    );
  }

  witdrawFD(deposit: any): void {
    this.userDepositService.deleteFixedDeposit(deposit._id).subscribe(
      (response: any) => {
        this.toast.success({ detail: "Success", summary: 'Fixed Deposit Withdrawn Successful', duration: 5000 });
        this.fetchAccounts();
      },
      (error) => {
        console.error('Error withdrawing fixed deposits:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to withdraw fixed deposit', duration: 5000 });
      }
    )

    // Transaction record
    const FDWDtransactionObj = {
      user_id: this.userId,
      account_id: deposit.account_id,
      transaction_type: "FD wdrl dt",
      amount: deposit.deposit_amount,
      receiver_acc: "Not Applicable",
      status: "success"
    };
    this.transactionService.createTransaction(FDWDtransactionObj).subscribe(
      () => {},
      (error) => {
        console.error('Error recurring deposit transaction', error);
      }
    )

  }

  witdrawRD(deposit: any): void {

    this.userDepositService.deleteRecurringDeposit(deposit._id).subscribe(
      (response: any) => {
        this.toast.success({ detail: "Success", summary: 'Recurring Deposit Withdrawn Successful', duration: 5000 });
        this.fetchAccounts();
      },
      (error) => {
        console.error('Error withdrawing fixed deposits:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to withdraw recurring deposit', duration: 5000 });
      }
    )
    // Record transaction
    const RDWDtransactionObj = {
      user_id: this.userId,
      account_id: deposit.account_id,
      transaction_type: "RD wdrl dt",
      amount: deposit.deposit_amount,
      receiver_acc: "Not Applicable",
      status: "success"
    };
    this.transactionService.createTransaction(RDWDtransactionObj).subscribe(
      () => {},
      (error) => {
        console.error('Error recurring deposit transaction', error);
      }
    )
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
      deposit_amount: this.selectedRD.deposit_amount + Number(this.amountTopay),
      interest_rate: this.selectedRD.interest_rate,
      status: this.selectedRD.status,
    };
    this.depositService.updateRecurringDeposit(this.selectedRD._id, updatedData).subscribe(
      (response) => {
        this.toast.success({ detail: "Success", summary: 'Amount added successfully', duration: 5000 });
        this.fetchAccounts();
        this.isRDUpdateFormOpen = false;
        this.amountTopay = 0;
      },
      (error) => {
        console.error('Error updating recurring deposit:', error);
        this.toast.error({ detail: "Error", summary: 'Failed to update recurring deposit', duration: 5000 });
      }
    );

    // Transaction record
    const FDCDtransactionObj = {
      user_id: this.userId,
      account_id: this.selectedRD.account_id,
      transaction_type: "FD TermPay ct",
      amount: this.amountTopay,
      receiver_acc: "Not Applicable",
      status: "success"
    };
    this.transactionService.createTransaction(FDCDtransactionObj).subscribe(
      () => {},
      (error) => {
        console.error('Error recurring deposit transaction', error);
      }
    )
  }
}
