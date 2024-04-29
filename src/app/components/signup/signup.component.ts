import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  host: {
    class: 'app-signup-main-cnt'
  }
})
export class SignupComponent implements OnInit {
  loginForm!: FormGroup; // Declare loginForm variable

  constructor(private formBuilder: FormBuilder,private UserService:UserService) { }

  ngOnInit() {
    // Initialize loginForm with formBuilder
    this.loginForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required,Validators.email],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,Validators.minLength(6)]
    });
  }

  get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    console.log(this.loginForm.controls);
    // Add your form submission logic here

    if (this.loginForm.invalid) {
      return;
    }
    const { FirstName, LastName, Email, Password } = this.loginForm.value;
    const requestBody= {
      firstName: FirstName,
      lastName:LastName,
      email: Email,
      password:Password
    };
    this.UserService.signinApiCall(requestBody).subscribe(res => console.log(res),error=>console.log(error));
    
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

}