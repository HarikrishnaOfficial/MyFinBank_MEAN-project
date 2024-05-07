import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true; // Allow navigation if user is logged in
    } else {
      this.router.navigateByUrl('/login'); // Redirect to login if user is not logged in
      return false;
    }
  }
}
