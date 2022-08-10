import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/company';
import { LocalCharge } from 'src/app/models/localCharge';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { LocalchargeService } from 'src/app/services/localcharge.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-local-charge',
  templateUrl: './local-charge.component.html',
  styleUrls: ['./local-charge.component.scss']
})
export class LocalChargeComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();


  addForm:FormGroup;
  updateForm:FormGroup;

  localCharges: LocalCharge[] = [];
  userOperationClaims : UserOperationClaim[] = [];
  isAuthenticated: boolean = false;
  searchString :string;
  localCharge:LocalCharge;

  allList:boolean = true;
  activeList:boolean = false;
  passiveList:boolean = false;

  allListCheck:string = "";
  activeListCheck:string = "";
  passiveListCheck:string = "";

  title:string = "Yerel Hizmetler Listesi";
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
    private localChargeService: LocalchargeService,
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
    this.localChargeService.getList().subscribe((res)=>{
      this.localCharges = res.data;
    })
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      name:[this.name,Validators.required]
      
    })
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id:[0],
      name:[this.name,Validators.required]
    })
  }

  updateLocalCharge(){
    if(this.updateForm.valid){
      let localChargeModel = Object.assign({}, this.updateForm.value);
      this.localChargeService.updateLocalCharge(localChargeModel).subscribe((res)=>{
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


  addLocalCharge(){
    if(this.addForm.valid){
      let localChargeModel = Object.assign({}, this.addForm.value);
      this.localChargeService.addLocalCharge(localChargeModel).subscribe((res)=>{
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

  currentLocalCharge(localCharge: LocalCharge){
    this.localCharge = localCharge;
  }

  deleteLocalCharge(localCharge: LocalCharge){
    this.localChargeService.deleteLocalCharge(localCharge).subscribe((res)=>{
      this.toastr.success(res.message);
      this.getList();
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  getLocalCharge(id:number){
    this.localChargeService.getLocalCharge(id).subscribe((res)=>{
      this.localCharge = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }
}
