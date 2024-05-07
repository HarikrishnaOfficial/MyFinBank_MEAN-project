import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin-main/admin-components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-main/user-components/user-dashboard/user-dashboard.component';
import { AdminCustomersComponent } from './admin-main/admin-components/admin-customers/admin-customers.component';
import { AdminAccountsComponent } from './admin-main/admin-components/admin-accounts/admin-accounts.component';
import { AdminLoansComponent } from './admin-main/admin-components/admin-loans/admin-loans.component';
import { AdminChatComponent } from './admin-main/admin-components/admin-chat/admin-chat.component';
import { UserAccountComponent } from './user-main/user-components/user-account/user-account.component';
import { UserLoanComponent } from './user-main/user-components/user-loan/user-loan.component';
import { UserDepositeComponent } from './user-main/user-components/user-deposite/user-deposite.component';
import { UserChatComponent } from './user-main/user-components/user-chat/user-chat.component';
import { EmiCalculatorComponent } from './user-main/user-components/emi-calculator/emi-calculator.component';
import { AdminDepositesComponent } from './admin-main/admin-components/admin-deposites/admin-deposites.component';
import { AdminTransactionsComponent } from './admin-main/admin-components/admin-transactions/admin-transactions.component';
import { UserTransactionsComponent } from './user-main/user-components/user-transactions/user-transactions.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'userDashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'adminCustomers', component: AdminCustomersComponent, canActivate: [AuthGuard] },
  { path: 'adminAccounts', component: AdminAccountsComponent, canActivate: [AuthGuard] },
  { path: 'adminLoans', component: AdminLoansComponent, canActivate: [AuthGuard] },
  { path: 'adminDeposites', component: AdminDepositesComponent, canActivate: [AuthGuard] },
  { path: 'adminTransactions', component: AdminTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'adminChat', component: AdminChatComponent, canActivate: [AuthGuard] },
  { path: 'userAccount', component: UserAccountComponent, canActivate: [AuthGuard] },
  { path: 'userLoan', component: UserLoanComponent, canActivate: [AuthGuard] },
  { path: 'userTransactions', component: UserTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'userDeposites', component: UserDepositeComponent, canActivate: [AuthGuard] },
  { path: 'emiCalculator', component: EmiCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'userChat', component: UserChatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
