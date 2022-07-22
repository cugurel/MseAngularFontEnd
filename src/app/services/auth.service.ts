import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { singleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public redirectUrl :string;

  constructor(private httpClient:HttpClient, private toastr:ToastrService, private router:Router) {
   }

   login(LoginModel: LoginModel){
      let api = "http://localhost:5262/api/Auth/login";
      return this.httpClient.post<singleResponseModel<TokenModel>>(api, LoginModel);
   }

   register(RegisterModel: RegisterModel){
    let api = "http://localhost:5262/api/Auth/register";
    return this.httpClient.post<singleResponseModel<TokenModel>>(api, RegisterModel);
 }

 

   isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
   }
   
}
