import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {

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
