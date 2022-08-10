import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { listResponseModel } from '../models/listResponseModel';
import { LocalCharge } from '../models/localCharge';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LocalchargeService {

  constructor(@Inject('apiUrl') private apiUrl:string, private httpClient:HttpClient) { }

  getList():Observable<listResponseModel<LocalCharge>>{
    let api = this.apiUrl + "localcharge/getlocalchargelist";
    return this.httpClient.get<listResponseModel<LocalCharge>>(api)
  }

  addLocalCharge(localCharge:LocalCharge):Observable<ResponseModel>{
    let api = this.apiUrl + "localcharge/addlocalcharge";
    return this.httpClient.post<ResponseModel>(api,localCharge);
  }

  deleteLocalCharge(localCharge:LocalCharge):Observable<ResponseModel>{
    let api = this.apiUrl + "localcharge/deletelocalcharge";
    return this.httpClient.post<ResponseModel>(api,localCharge);
  }

  getLocalCharge(id:number):Observable<singleResponseModel<LocalCharge>>{
    let api = this.apiUrl + "localcharge/getlocalchargebyid?id="+id;
    return this.httpClient.get<singleResponseModel<LocalCharge>>(api);
  }


  updateLocalCharge(localCharge:LocalCharge):Observable<ResponseModel>{
    let api = this.apiUrl + "localcharge/updatelocalcharge";
    return this.httpClient.post<ResponseModel>(api,localCharge);
  }
}
