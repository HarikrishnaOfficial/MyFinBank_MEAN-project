import { Component, OnInit } from '@angular/core';
import { UserLoanService } from '../../user-services/user-loan.service';
import { UserAccountService } from '../../user-services/user-account.service';
import { UserTransactionsService } from '../../user-services/user-transactions.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-loan',
  templateUrl: './user-loan.component.html',
  styleUrls: ['./user-loan.component.css']
})
export class UserLoanComponent implements OnInit {
  dummyEMI = 0;
  userId: string = "";
  loans: any[] = [];
  showLoanForm: boolean = false;
  loanAmount: number = 0;
  interestRate: number = 10; // Default interest rate
  months: number = 0;
  errorMessage: string = "";
  accountId: string = "";
  accounts: any[] = []; // Array to store user accounts

  constructor(private userLoanService: UserLoanService,
    private userAccountService: UserAccountService,
    private toast: NgToastService,
    private transactionService: UserTransactionsService
  ) { }

  ngOnInit(): void {
    // Retrieve userId from local storage
    if (typeof sessionStorage !== 'undefined') {
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.userId = userData.userId;

        this.fetchLoans();
        this.fetchAccounts();
      }
    }
  }

  fetchLoans(): void {
    this.userLoanService.getLoansByUserId(this.userId).subscribe(
      (loans: any[]) => {
        this.loans = loans;
        this.showLoanForm = this.loans.length === 0;
      },
      (error) => {
        console.error('Error fetching loans:', error);
        this.toast.error({ detail: "Error", summary:'Failed to fetch loans. Please try again later.', duration: 5000 });
      }
    );
  }

  fetchAccounts(): void {
    this.userAccountService.getUserAccounts(this.userId).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.accounts = response;
        }
      },
      (error) => {
        console.error('Error fetching user accounts:', error);
        this.toast.error({ detail: "Error", summary:'Failed to fetch user accounts. Please try again later.', duration: 5000 });
      }
    );
  }

  onCreateLoan(): void {
    this.fetchLoans();
    this.fetchAccounts();
    this.accountId = this.accounts[0]._id;
    if (!this.accountId) {
      this.toast.error({ detail: "Error", summary:'Please select an account.', duration: 5000 });
      return;
    }

    const loanData = {
      account_id: this.accountId,
      loan_amount: this.loanAmount,
      interest_rate: this.interestRate,
      months: this.months,
      emi: 0,
      status: "pending"
    };

    this.userLoanService.createLoan(loanData).subscribe(
      () => {
        this.fetchLoans();
        this.showLoanForm = false;
        this.toast.success({ detail: "Success", summary:'Loan applied successfully!', duration: 5000 });
      },
      (error) => {
        console.error('Error creating loan:', error);
        this.toast.error({ detail: "Error", summary:'Failed to create loan. Please try again later.', duration: 5000 });
      }
    );
  }

  activateLoan(loanId: string): void {
    this.deposit();
    this.updateLoanStatusforActivation(loanId);
  }

  payEMI(loanId: string): void {
    const loanData = this.loans.find(loan => loan._id === loanId);
    const account = this.accounts.find(acc => acc._id === loanData.account_id);

    if (!loanData || !account || loanData.loan_amount <= 0) {
      this.toast.error({ detail: "Error", summary:'Invalid loan or account information.', duration: 5000 });
      return;
    }

    if (account.balance < loanData.emi) {
      this.toast.error({ detail: "Error", summary:'Insufficient funds in the account.', duration: 5000 });
      return;
    }

    this.withdraw();
    this.updateLoanStatusforEMIPaid(loanId);
  }

  deposit(): void {
    const loanData = this.loans[0];
    const account = this.accounts[0];

    if (!loanData || !account || loanData.loan_amount <= 0) {
      this.toast.error({ detail: "Error", summary:'Please enter a valid amount to deposit.', duration: 5000 });
      return;
    }

    const updatedBalance = account.balance + loanData.loan_amount;
    const obj = {
      "user_id": this.userId,
      "account_type": account.account_type,
      "balance": updatedBalance
    };

    this.userAccountService.updateUserAccount(account._id, obj).subscribe(
      () => {
        account.balance = updatedBalance;

        //Transaction record
        const LoanCredittransactionObj = {
          user_id: this.userId,
          account_id: account._id, // Corrected account_id
          transaction_type: "Loan Credit", // Corrected transaction_type
          amount: loanData.loan_amount,
          receiver_acc: "Not Applicable",
          status: "success"
        };
        this.transactionService.createTransaction(LoanCredittransactionObj).subscribe(
          () => {
          }, (error) => {
            console.error('Error reccuring deposit transaction', error);
          }
        )

        this.toast.success({ detail: "Success", summary:'Deposit successful', duration: 5000 });
        this.loanAmount = 0;
      },
      (error) => {
        console.error('Error updating balance:', error);
        this.toast.error({ detail: "Error", summary:'Failed to update balance. Please try again later.', duration: 5000 });
      }
    );
  }

  updateLoanStatusforActivation(loanId: string): void {
    const loanData = this.loans[0];
    const updatedData = {
      "account_id": loanData.account_id,
      "loan_amount": loanData.loan_amount,
      "interest_rate": loanData.interest_rate,
      "months": loanData.months,
      "emi": 0,
      "status": "active"
    };

    this.userLoanService.updateLoan(loanId, updatedData).subscribe(
      () => {
        this.fetchLoans();
        this.toast.success({ detail: "Success", summary:'Loan activated successfully!', duration: 5000 });
      },
      (error) => {
        console.error('Error updating loan status:', error);
        this.toast.error({ detail: "Error", summary:'Failed to update loan status. Please try again later.', duration: 5000 });
      }
    );
  }

  withdraw(): void {
    const loanData = this.loans[0];
    const account = this.accounts[0];

    if (!loanData || !account || loanData.loan_amount <= 0) {
      this.toast.error({ detail: "Error", summary:'Please enter a valid amount to withdraw.', duration: 5000 });
      return;
    }

    const updatedBalance = account.balance - loanData.emi;
    const obj = {
      "user_id": this.userId,
      "account_type": account.account_type,
      "balance": updatedBalance
    };

    this.userAccountService.updateUserAccount(account._id, obj).subscribe(
      () => {
        account.balance = updatedBalance;
        this.toast.success({ detail: "Success", summary:'Withdraw successful', duration: 5000 });
        this.loanAmount = 0;
      },
      (error) => {
        console.error('Error updating balance:', error);
        this.toast.error({ detail: "Error", summary:'Failed to update balance. Please try again later.', duration: 5000 });
      }
    );
  }

  updateLoanStatusforEMIPaid(loanId: string): void {
    const loanData = this.loans[0];

    if (loanData.months === 1) {
      // record EMI repay
      const reapyEMItransactionObj = {
        user_id: this.userId,
        account_id: loanData.account_id, // Corrected account_id
        transaction_type: "EMI Repay dt", // Corrected transaction_type
        amount: loanData.emi,
        receiver_acc: "Not Applicable",
        status: "success"
      };
      this.transactionService.createTransaction(reapyEMItransactionObj).subscribe(
        () => {
          // deleting loan after cleared
          this.userLoanService.deleteLoan(loanId).subscribe(
            () => {
              this.fetchLoans();
              this.toast.success({ detail: "Success", summary:'Loan cleared successfully!', duration: 5000 });
              this.showLoanForm = true;
            },
            (error) => {
              console.error('Error in clearing loan:', error);
              this.toast.error({ detail: "Error", summary:'Failed to clear loan. Please try again later.', duration: 5000 });
            }
          );
        }, (error) => {
          console.error('Error reccuring deposit transaction', error);
        }
      )

    } else {
      const updatedData = {
        "account_id": loanData.account_id,
        "loan_amount": loanData.loan_amount - loanData.emi,
        "interest_rate": loanData.interest_rate,
        "months": loanData.months - 1,
        "emi": 0,
        "status": "active"
      };
      this.userLoanService.updateLoan(loanId, updatedData).subscribe(
        () => {
          this.fetchLoans();
          this.toast.success({ detail: "Success", summary:'Loan payment successful!', duration: 5000 });
        },
        (error) => {
          console.error('Error updating loan status:', error);
          this.toast.error({ detail: "Error", summary:'Failed to update loan status. Please try again later.', duration: 5000 });
        }
      );

      // record EMI repay
      const reapyEMItransactionObj = {
        user_id: this.userId,
        account_id: loanData.account_id, // Corrected account_id
        transaction_type: "EMI Repay dt", // Corrected transaction_type
        amount: loanData.emi,
        receiver_acc: "Not Applicable",
        status: "success"
      };
      this.transactionService.createTransaction(reapyEMItransactionObj).subscribe(
        () => {
        }, (error) => {
          console.error('Error reccuring deposit transaction', error);
        }
      )
    }
  }
}
