import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Person } from '../models/person';
import { ResponseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(@Inject('apiUrl') private apiUrl:string, private httpClient:HttpClient) { }

  getList():Observable<listResponseModel<Person>>{
    let api = this.apiUrl + "person/getpersonlist";
    return this.httpClient.get<listResponseModel<Person>>(api)
  }

  deletePerson(person:Person):Observable<ResponseModel>{
    let api = this.apiUrl + "person/deleteperson";
    return this.httpClient.post<ResponseModel>(api,person);
  }

  getPerson(id:number):Observable<singleResponseModel<Person>>{
    let api = this.apiUrl + "person/getpersonbyid?id="+id;
    return this.httpClient.get<singleResponseModel<Person>>(api);
  }

  updatePerson(person:Person):Observable<ResponseModel>{
    let api = this.apiUrl + "person/updateperson";
    return this.httpClient.post<ResponseModel>(api,person);
  }

  addPerson(person:Person):Observable<ResponseModel>{
    let api = this.apiUrl + "person/addperson";
    return this.httpClient.post<ResponseModel>(api,person);
  }
}
