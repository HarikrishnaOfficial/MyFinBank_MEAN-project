import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../admin-services/transaction.service';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.css']
})
export class AdminTransactionsComponent implements OnInit {
  transactions: any[] = [];
  selectedTransaction: any | null = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (data: any[]) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  openEditPopup(transaction: any): void {
    this.selectedTransaction = { ...transaction };
  }

  closeEditPopup(): void {
    this.selectedTransaction = null;
  }

  saveTransaction(): void {
    // Assuming you have a method in your transactionService to update a transaction
    if (this.selectedTransaction) {
      this.transactionService.updateTransaction(this.selectedTransaction._id, this.selectedTransaction)
        .subscribe(
          (response) => {
            console.log('Transaction updated successfully:', response);
            // Refresh the transaction list
            this.getAllTransactions();
            // Close the popup
            this.closeEditPopup();
          },
          (error) => {
            console.error('Error updating transaction:', error);
          }
        );
    }
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe(
      (response) => {
        console.log('Transaction deleted successfully:', response);
        // Refresh the transaction list
        this.getAllTransactions();
      },
      (error) => {
        console.error('Error deleting transaction:', error);
      }
    );
  }
}
