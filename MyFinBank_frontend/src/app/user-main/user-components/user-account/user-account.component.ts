import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../user-services/user-account.service';
import { UserTransactionsService } from '../../user-services/user-transactions.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  accounts: any[] = []; // Array to hold user accounts
  userId: any = ''; // Variable to hold the user ID
  depositAmount: number = 0; // Variable to hold the deposit amount
  withdrawAmount: number = 0; // Variable to hold the withdraw amount
  transferAmount: number = 0; // Variable to hold the transfer amount
  recipientAccountId: string = ''; // Variable to hold the recipient's account ID

  constructor(private userAccountService: UserAccountService,
    private toast: NgToastService,
    private transactionService: UserTransactionsService
  ) { }

  ngOnInit(): void {
    // Retrieve userData from local storage
    const userDataString = sessionStorage.getItem('userData');

    if (userDataString) {
      // Parse the userData string into a JavaScript object
      const userData = JSON.parse(userDataString);
      // Access the userId property from the parsed object
      this.userId = userData.userId;

      if (this.userId) {
        this.getUserAccounts(this.userId);
      }
    }
  }

  getUserAccounts(userId: string): void {
    this.userAccountService.getUserAccounts(userId).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.accounts = response;
        }
      },
      (error) => {
        console.error('Error fetching user accounts:', error);
      }
    );
  }

  deposit(): void {
    if (this.depositAmount <= 0) {
      this.toast.error({ detail: "Error", summary:'Please enter a valid amount to deposite.', duration: 5000 })
      return;
    }

    const account = this.accounts[0]; // Assuming only one account for simplicity

    // Proceed with deposite
    const updatedBalance = account.balance + this.depositAmount;
    const obj = {
      "user_id": this.userId,
      "account_type": account.account_type,
      "balance": updatedBalance
    }

    // Call service method to update the balance
    this.userAccountService.updateUserAccount(account._id, obj).subscribe(
      (response) => {
        // Update the local account balance if the API call is successful
        account.balance = updatedBalance;

        //transaction record
        const transactionObj = {
          user_id: this.userId,
          account_id: account._id, // Corrected account_id
          transaction_type: "A/C dpst ct", // Corrected transaction_type
          amount: this.depositAmount,
          receiver_acc: "Not Applicable",
          status: "success"
        };
        this.transactionService.createTransaction(transactionObj).subscribe(
          () => {
            console.log('deposite trancartion succesfull')
          }, (error) => {
            console.error('Error reccuring deposit transaction', error);
          }
        )

        this.toast.success({ detail: "Success", summary:'Deposite Scussesful', duration: 5000 })
        this.depositAmount = 0;
      },
      (error) => {
        this.toast.error({ detail: "Error", summary:'Failed to update balance.', duration: 5000 })
        console.error('Error updating balance:', error);
      }
    );
  }

  withdraw(): void {
    if (this.withdrawAmount <= 0) {
      this.toast.error({ detail: "Error", summary:'Please enter a valid amount to withdraw.', duration: 5000 })
      return;
    }

    const account = this.accounts[0]; // Assuming only one account for simplicity

    if (account.balance < this.withdrawAmount) {
      this.toast.warning({ detail: "Warning", summary:'Insufficient Funds', duration: 5000 })
      return;
    }

    // Proceed with withdrawal
    const updatedBalance = account.balance - this.withdrawAmount;
    const obj = {
      "user_id": this.userId,
      "account_type": account.account_type,
      "balance": updatedBalance
    }

    // Call service method to update the balance
    this.userAccountService.updateUserAccount(account._id, obj).subscribe(
      (response) => {
        // Update the local account balance if the API call is successful
        account.balance = updatedBalance;

        //transaction record
        const transactionObj = {
          user_id: this.userId,
          account_id: account._id, // Corrected account_id
          transaction_type: "A/C wdrl dt", // Corrected transaction_type
          amount: this.withdrawAmount,
          receiver_acc: "Not Applicable",
          status: "success"
        };
        this.transactionService.createTransaction(transactionObj).subscribe(
          () => {
            
          }, (error) => {
            console.error('Error reccuring deposit transaction', error);
            console.log('Deposite Transaction Failed')
          }
        )

        this.toast.success({ detail: "Success", summary:'Withdraw Scussesful', duration: 5000 })
        this.withdrawAmount = 0;
      },
      (error) => {
        console.error('Error updating balance:', error);
        this.toast.error({ detail: "Error", summary:'Failed to update balance.', duration: 5000 })
      }
    );
  }



  fundTransfer(): void {
    if (this.transferAmount <= 0) {
      this.toast.warning({ detail: "Warning", summary:'Please enter a valid amount', duration: 5000 })
      return;
    }

    const account = this.accounts[0]; // Assuming only one account for simplicity

    if (account.balance < this.transferAmount) {
      this.toast.warning({ detail: "Warning", summary:'Insufficient Funds', duration: 5000 })
      return;
    }

    if (!this.recipientAccountId) {
      this.toast.warning({ detail: "Warning", summary:'Please provide recipient account ID', duration: 5000 })
      return;
    }

    // Fetch recipient account details
    this.userAccountService.getAccountById(this.recipientAccountId).subscribe(
      (recipientAccount) => {
        const receverInfo = { ...recipientAccount };
        console.log(receverInfo);
        if (!recipientAccount) {
          this.toast.warning({ detail: "Warning", summary:'Please provide recipient account ID', duration: 5000 })
          return;
        }

        // Proceed with fund transfer
        const withdrawalObj = {
          "user_id": this.userId,
          "account_type": account.account_type,
          "balance": account.balance - this.transferAmount
        };

        // Call service methods to perform withdrawal
        this.userAccountService.updateUserAccount(account._id, withdrawalObj).subscribe(
          () => {
            // Withdrawal successful, now deposit to recipient account
            const depositObj = {
              "user_id": receverInfo['0'].user_id,
              "account_type": receverInfo['0'].account_type,
              "balance": receverInfo['0'].balance + this.transferAmount
            };
            // Call service methods to perform deposit
            this.userAccountService.updateUserAccount(this.recipientAccountId, depositObj).subscribe(
              () => {
                // Update local account balances
                account.balance -= this.transferAmount;
                recipientAccount.balance += this.transferAmount;

                //transaction record for recepient
                const rectransactionObj = {
                  user_id: receverInfo['0'].user_id,
                  account_id: this.recipientAccountId, // Corrected account_id
                  transaction_type: "A/C FT ct", // Corrected transaction_type
                  amount: this.transferAmount,
                  receiver_acc: account._id,
                  status: "success"
                };
                this.transactionService.createTransaction(rectransactionObj).subscribe(
                  () => {
                    console.log('fund transfer deposite trancartion succesfull')
                  }, (error) => {
                    this.toast.error({ detail: "Error", summary:'Fund Trafer Failed', duration: 5000 })
                    console.error('Error reccuring deposit transaction', error);
                  }
                )

                //transaction record for sender
                const sentransactionObj = {
                  user_id: this.userId,
                  account_id: account._id, // Corrected account_id
                  transaction_type: "A/C FT dt", // Corrected transaction_type
                  amount: this.transferAmount,
                  receiver_acc: this.recipientAccountId,
                  status: "success"
                };
                this.transactionService.createTransaction(sentransactionObj).subscribe(
                  () => {
                    console.log('Fund transfer withdraw trancartion succesfull')
                  }, (error) => {
                    console.error('Error reccuring deposit transaction', error);
                  }
                )

                this.toast.success({ detail: "Success", summary:'Fund Transfer Succesful', duration: 5000 })
                this.transferAmount = 0;
                this.recipientAccountId = '';
              },
              (error) => {
                console.error('Error depositing to recipient account:', error);
                
                this.toast.error({ detail: "Error", summary:'Failed to deposite to receiver account', duration: 5000 })
              }
            );
          },
          (error) => {
            console.error('Error withdrawing from sender account:', error);
            this.toast.error({ detail: "Error", summary:'Failed to withdraw from sender account', duration: 5000 })
          }
        );
      },
      (error) => {
        console.error('Error fetching recipient account:', error);
        this.toast.error({ detail: "Error", summary:'Failed to fetch recipient account', duration: 5000 })
      }
    );
  }

}
