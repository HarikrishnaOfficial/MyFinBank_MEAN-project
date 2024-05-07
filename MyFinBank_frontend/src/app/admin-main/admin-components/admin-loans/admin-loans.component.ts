import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../admin-services/loan.service';

@Component({
  selector: 'app-admin-loans',
  templateUrl: './admin-loans.component.html',
  styleUrls: ['./admin-loans.component.css']
})
export class AdminLoansComponent implements OnInit {
  loans: any[] = [];
  editedLoan: any = {}; // Object to store edited loan details
  isEditFormOpen: boolean = false; // Flag to toggle edit form visibility

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.getLoans(); // Initial fetch of loans
  }

  getLoans(): void {
    this.loanService.getAllLoans()
      .subscribe(loans => {
        this.loans = loans;
      });
  }

  openEditForm(loan: any): void {
    // Assign the loan to editedLoan for editing
    this.editedLoan = { ...loan }; // Create a copy to avoid mutating the original loan
    this.isEditFormOpen = true;
  }

  closePopup(): void {
    // Reset editedLoan and close the edit form
    this.editedLoan = {};
    this.isEditFormOpen = false;
  }

  saveLoan(): void {
    // Update the loan using the LoanService
    this.loanService.updateLoan(this.editedLoan._id, this.editedLoan)
      .subscribe(updatedLoan => {
        // Update the loan in the loans array
        const index = this.loans.findIndex(loan => loan._id === updatedLoan._id);
        if (index !== -1) {
          this.loans[index] = updatedLoan;
        }
        // Close the edit form
        this.closePopup();
        
        // Manually trigger the getLoans() method to fetch updated data
        this.getLoans();
      }, error => {
        // Handle error if any
        console.error('Error updating loan:', error);
      });
  }

  deleteLoan(loanId: string): void {
    // Delete the loan using the LoanService
    this.loanService.deleteLoan(loanId)
      .subscribe(() => {
        // Filter out the deleted loan from the loans array
        this.loans = this.loans.filter(loan => loan._id !== loanId);
      }, error => {
        // Handle error if any
        console.error('Error deleting loan:', error);
      });
  }
  
}
