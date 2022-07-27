import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient : HttpClient
  ) { }

  getList(){
    
  }
}
