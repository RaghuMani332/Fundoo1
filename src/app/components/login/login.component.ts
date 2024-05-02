import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../Services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'app-login-main-cnt'
  }
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup 
  
  constructor(private formBuilder : FormBuilder,private router:Router,private UserService:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
  } )
  }
  get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    const {email,password}=this.loginForm.controls
    this.UserService.loginApiCall(email.value,password.value).subscribe(res => 
      {
        localStorage.setItem('authToken',res.data)
        this.router.navigate(['dashboard/notes'])
      },err => {
        console.log(err)
      })

  }
}