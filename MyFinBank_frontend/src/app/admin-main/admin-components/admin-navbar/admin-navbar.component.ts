import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Clear token from memory
    this.userService.storeToken(null);
    // Navigate to login page
    this.router.navigateByUrl('/login');
    //clearing userdetails in sesion storage
    sessionStorage.removeItem('userData');
    this.userService.cleareToken();
  }
}
