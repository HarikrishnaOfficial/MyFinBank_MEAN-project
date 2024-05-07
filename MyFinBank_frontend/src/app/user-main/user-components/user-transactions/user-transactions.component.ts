import { Component } from '@angular/core';
import { UserTransactionsService } from '../../user-services/user-transactions.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.css'
})
export class UserTransactionsComponent {
  transactions: any[] = [];
  userId: string = "";

  constructor(private transactionService: UserTransactionsService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.userId = userData.userId;
      }
    }
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getTransactionByUserId(this.userId).subscribe(
      (data: any[]) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.toast.error({ detail: "Error", summary:'Transactions Fetching Failed, Try again!', duration: 5000 })
      }
    );
  }

}
