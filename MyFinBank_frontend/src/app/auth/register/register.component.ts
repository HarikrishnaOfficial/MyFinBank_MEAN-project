import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { UserService } from '../user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // Registration Submit logic goes here
    this.userService.register(this.registerForm.value).subscribe(
      (res) => {
        if(res.message){
          this.toast.success({detail:"Success",summary:res.message,duration:5000});
          this.router.navigateByUrl('/login'); 
        }else if(res.warning){
          this.toast.warning({detail:"Warning",summary:res.warning,duration:5000})
        }
      },
      (error) => {
        this.toast.error({detail:"Error",summary:"Registration Failed!",duration:5000})
        console.error('Registration failed:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login'); // Navigate to the login page
  }
}
