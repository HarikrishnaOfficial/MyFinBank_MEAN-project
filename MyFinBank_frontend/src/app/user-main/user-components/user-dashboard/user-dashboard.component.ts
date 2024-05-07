import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  username: string | null = '';
  isActive: string | null = '';

  constructor(private userService: UserService
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
}

