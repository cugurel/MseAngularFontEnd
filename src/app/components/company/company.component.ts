import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/company';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();


  addForm:FormGroup;
  updateForm:FormGroup;

  companies: Company[] = [];
  userOperationClaims : UserOperationClaim[] = [];
  isAuthenticated: boolean = false;
  searchString :string;
  company:Company;

  allList:boolean = true;
  activeList:boolean = false;
  passiveList:boolean = false;

  allListCheck:string = "";
  activeListCheck:string = "";
  passiveListCheck:string = "";

  title:string = "Aktif Şirket Listesi";
  filterText:string="";

  name:string;
  address:string;
  gsm:string;
  localPhone:string;
  isActive : boolean = true;
  userId:string;

  operationAdd = false;
  operationUpdate=false;
  operationDelete = false;
  operationGet = false;
  operationList= false;


  constructor(
    private toastr: ToastrService,
    private companyService: CompanyService,
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private userOperationClaimService : UserOperationClaimService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.userOperationClaimGetList();
    this.getList();
    this.createAddForm();
    this.createUpdateForm();
    this.userOperationClaimGetList();
    
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
      this.userId = decode[userId];
    }
  }

  userOperationClaimGetList(){
    
    this.userOperationClaimService.getList(this.userId).subscribe((res)=>{
    this.userOperationClaims = res.data;
    console.log(res.data);
    res.data.forEach(element =>{
      if(element.name == "Admin"){
        this.operationAdd = true;
        this.operationUpdate=true;
        this.operationDelete = true;
        this.operationGet = true;
        this.operationList= true;
      }

      if(element.name == "Company.Add"){
        this.operationAdd = true;
      }
      if(element.name == "Company.Update"){
        this.operationUpdate = true;
      }
      if(element.name == "Company.Delete"){
        this.operationDelete = true;
      }
      if(element.name == "Company.Delete"){
        this.operationGet = true;
      }
      if(element.name == "Company.GetList"){
        this.operationList = true;
      }
    });
    },(err)=>{
      this.toastr.error("Bir hata ile karşılaştık. Lütfen daha sonra tekrar deneyin");
    })
  }

  getList(){
    this.companyService.getList().subscribe((res)=>{
      this.companies = res.data;
      console.log(this.companies);
    })
  }

  exportExcel(){
    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'sheet1');

    XLSX.writeFile(wb,"Müşteri Listesi.xlsx");
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      name:[this.name,Validators.required],
      address:[""],
      gsm:[""],
      localPhone:[""],
      isActive: true
    })
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id:[0],
      name:[this.name,Validators.required],
      address:[""],
      gsm:[""],
      localPhone:[""],
      isActive: true
    })
  }

  deleteCompany(company: Company){
    this.companyService.deleteCompany(company).subscribe((res)=>{
      this.toastr.success(res.message);
      this.getList();
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  changeStatusCompany(company: Company){
    company.isActive ? company.isActive = false : company.isActive = true; 
    this.companyService.updateCompany(company).subscribe((res)=>{
      this.toastr.warning(res.message);
      this.getList();
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  addCompany(){
    if(this.addForm.valid){
      let companyModel = Object.assign({}, this.addForm.value);
      this.companyService.addCompany(companyModel).subscribe((res)=>{
        this.toastr.success(res.message);
        this.getList();
        this.createAddForm();
        document.getElementById("closeModal").click();
      },(err)=>{
        this.toastr.error(err.error)
      })
    }else{
      this.toastr.error("Validasyon Hatası");
    }
  }

  updateCompany(){
    if(this.updateForm.valid){
      let companyModel = Object.assign({}, this.updateForm.value);
      this.companyService.updateCompany(companyModel).subscribe((res)=>{
        this.toastr.success(res.message);
        this.getList();
        this.createAddForm();
        document.getElementById("closeUpdateModal").click();
      },(err)=>{
        this.toastr.error(err.error)
      })
    }else{
      this.toastr.error("Validasyon Hatası");
    }
  }

  currentCompany(company: Company){
    this.company = company;
    //console.log(this.company);
  }

  getListByCheck(text:string){

    if(text == "allList"){
      this.filterText=""
      this.title = "Tüm Şirketler";
      this.activeList=false;
      this.passiveList = false;
      this.allListCheck = "checked";
      this.activeListCheck = "";
      this.passiveListCheck = "";
    }else if(text == "activeList"){
      this.filterText = "true";
      this.title = "Tüm Aktif Şirketler";
      this.allList=false;
      this.passiveList=false
      this.allListCheck = "";
      this.activeListCheck = "checked";
      this.passiveListCheck = "";
    }else if(text == "passiveList"){
      this.filterText = "false";
      this.title="Tüm Pasif Şirketler";
      this.allList = false;
      this.activeList = false;
      this.allListCheck = "";
      this.activeListCheck = "";
      this.passiveListCheck = "checked";
    }
  }

  getCompany(id:number){
    this.companyService.getCompany(id).subscribe((res)=>{
      this.company = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["address"].setValue(res.data.address);
      this.updateForm.controls["gsm"].setValue(res.data.gsm);
      this.updateForm.controls["localPhone"].setValue(res.data.localPhone);
      console.log(this.company);
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }
}
