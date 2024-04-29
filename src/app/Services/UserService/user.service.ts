import { Injectable } from '@angular/core';
import { HttpService } from './../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private HttpService : HttpService) { }
  
  loginApiCall(email:string,password:string){
    return this.HttpService.loginApi(email,password)
  }
  signinApiCall(requestBody:any){
return this.HttpService.signinApi(requestBody)
  }
}