import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // email: ['user1@example.com', [Validators.required, Validators.email]],
      // password: ['userPassword123', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Call login method from UserService
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        // Handle  login
        if (res.message) {
          this.toast.success({ detail: "Success", summary: 'Login successful!', duration: 5000 })
        }
        // Store token in memory
        this.userService.storeToken(res.token);

        //user data storage
        const userData = {
          userId : res.userId,
          username: res.username,
          isActive: res.isActive
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        if (this.userService.getToken() === null) {
          this.router.navigateByUrl('/login');
        } else {
          // Navigate to appropriate dashboard
          if (res.isAdmin) {
            this.toast.success({ detail: "Welcome", summary: `Admin ${res.username}`, duration: 5000 })
            this.router.navigateByUrl('/adminDashboard');
          } else {
            this.toast.success({ detail: "Welcome", summary: `User ${res.username}`, duration: 5000 })
            this.router.navigateByUrl('/userDashboard');
          }
        }

      },
      (error) => {
        // Handle login error
        this.errorMessage = 'Invalid email or password';
        this.toast.error({ detail: "Error", summary: this.errorMessage, duration: 5000 })
        console.error('Login failed:', error);
        
      }
    );

  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
