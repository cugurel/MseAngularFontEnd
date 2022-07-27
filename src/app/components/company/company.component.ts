import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from 'src/app/models/company';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();

  companies: Company[] = [];
  isAuthenticated: boolean = false;
  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getList();
  }

  refresh() {
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
    }
  }

  getList(){
    this.companyService.getList().subscribe((res)=>{
      this.companies = res.data;
      console.log(this.companies);
    })
  }
}
