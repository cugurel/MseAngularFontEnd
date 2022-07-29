import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(@Inject('apiUrl') private apiUrl:string, private httpClient:HttpClient) { }

  getList():Observable<listResponseModel<Company>>{
    let api = this.apiUrl + "company/getcompanylist";
    return this.httpClient.get<listResponseModel<Company>>(api)
  }

  deleteCompany(company:Company):Observable<ResponseModel>{
    let api = this.apiUrl + "company/deletecompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }

  getCompany(id:number):Observable<singleResponseModel<Company>>{
    let api = this.apiUrl + "company/getcompanybyid?id="+id;
    return this.httpClient.get<singleResponseModel<Company>>(api);
  }

  updateCompany(company:Company):Observable<ResponseModel>{
    let api = this.apiUrl + "company/updatecompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }

  addCompany(company:Company):Observable<ResponseModel>{
    let api = this.apiUrl + "company/addcompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }
  
}

