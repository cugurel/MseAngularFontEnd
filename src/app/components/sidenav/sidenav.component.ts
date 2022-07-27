import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  jwtHelper : JwtHelperService = new JwtHelperService;
  
  isAuthenticated : boolean;
  name:string;
  currentUrl : string ="";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
  }

  changeClass(url:string){
    this.currentUrl = this.router.routerState.snapshot.url;
    if(url == this.currentUrl){
      return "nav-link text-white active bg-gradient-primary";
    }else{
      return "nav-link text-white";
    }
  }

  refresh(){
    if(this.isAuthenticated){
      let token = localStorage.getItem("token");
      let decode = this.jwtHelper.decodeToken(token);
      let name = Object.keys(decode).filter(x=>x.endsWith("/name"))[0];
      this.name = decode[name];
    }
  }

}
