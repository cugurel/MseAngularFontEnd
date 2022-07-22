import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
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

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient, 
    private toastr:ToastrService, 
    private router:Router
    
    ) {
   }

   login(LoginModel: LoginModel){
      let api = this.apiUrl + "Auth/login";
      return this.httpClient.post<singleResponseModel<TokenModel>>(api, LoginModel);
   }

   register(RegisterModel: RegisterModel){
    let api = this.apiUrl + "Auth/Register";
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
