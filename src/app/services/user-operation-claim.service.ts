import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { UserOperationClaim } from '../models/userOperationClaimModel';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient : HttpClient
  ) { }

  getList(userId:string):Observable<listResponseModel<UserOperationClaim>>{
    let api = this.apiUrl + "UserOperationClaims/getListDto?userId="+userId;
    return this.httpClient.get<listResponseModel<UserOperationClaim>>(api);
  }
}
