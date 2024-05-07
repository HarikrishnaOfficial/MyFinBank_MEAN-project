import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserService } from './auth/user.service';
import { NgToastModule } from 'ng-angular-popup';
import { AdminNavbarComponent } from './admin-main/admin-components/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-main/admin-components/admin-dashboard/admin-dashboard.component';
import { UserNavbarComponent } from './user-main/user-components/user-navbar/user-navbar.component';
import { UserDashboardComponent } from './user-main/user-components/user-dashboard/user-dashboard.component';
import { CommonFooterComponent } from './common-components/common-footer/common-footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    UserNavbarComponent,
    UserDashboardComponent,
    CommonFooterComponent,
    AdminCustomersComponent,
    AdminAccountsComponent,
    AdminLoansComponent,
    AdminChatComponent,
    UserAccountComponent,
    UserLoanComponent,
    UserDepositeComponent,
    UserChatComponent,
    EmiCalculatorComponent,
    AdminDepositesComponent,
    AdminTransactionsComponent,
    UserTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
