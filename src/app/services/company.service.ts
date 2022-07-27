import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(@Inject('apiUrl') private apiUrl:string, private httpClient:HttpClient) { }

  getList():Observable<listResponseModel<Company>>{
    let api = this.apiUrl + "company/getcompanylist";
    return this.httpClient.get<listResponseModel<Company>>(api)
  }

  
}

