import { Component } from '@angular/core';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrl: './emi-calculator.component.css'
})
export class EmiCalculatorComponent {

  dummyEMI = 0;
  interestRate = 10;
  months = 0;
  loanAmount = 0;

  EMICalculator() {
    const rate = this.interestRate / (12 * 100); // Monthly interest rate
    const tenure = this.months;
    let emi = this.loanAmount * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
    emi = Math.round(emi);
    this.dummyEMI = emi;
  }

  clear() {
    this.interestRate = 10;
    this.months = 0;
    this.loanAmount = 0;
    this.dummyEMI = 0;

  }

}
