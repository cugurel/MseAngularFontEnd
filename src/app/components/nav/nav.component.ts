import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isAuthenticated : boolean;

  constructor(private httpClient:HttpClient, private toastr:ToastrService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
  }

  refresh(){
    if(this.isAuthenticated){
      let token = localStorage.getItem("token");
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.toastr.warning("Oturum başarıyla kapatıldı");
    this.router.navigate(["/login"])
    this.isAuthenticated = false;
   }
}
