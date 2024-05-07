import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { EmailService } from '../../admin-services/mail.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  username: string | null = '';
  isActive: string | null = '';

  constructor(private userService: UserService,
    private mailService: EmailService
  ) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      // Retrieve user data from session storage
      const userDataString = sessionStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.username = userData.username;
        if (userData.isActive) {
          this.isActive = "Active"
        }
        if (!userData.isActive) {
          this.isActive = "Inactive"
        }
      }
    }
  }

  sendMails(): void {
    this.mailService.sendEmailBalanceZero().subscribe(
      () => {
        alert('Emails sent for zero balance accounts.');
      },
      error => {
        console.error('Error sending emails for zero balance accounts:', error);
      }
    );
  
    this.mailService.sendZeroBalanceEmailsToAdmins().subscribe(
      () => {
        alert('Zero balance emails list sent to admins.');
      },
      error => {
        console.error('Error sending zero balance emails list to admins:', error);
      }
    );
  }
  
}
