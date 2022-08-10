import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/models/person';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();


  addForm:FormGroup;
  updateForm:FormGroup;

  people: Person[] = [];
  userOperationClaims : UserOperationClaim[] = [];
  isAuthenticated: boolean = false;
  searchString :string;
  person:Person;

  allList:boolean = true;
  activeList:boolean = false;
  passiveList:boolean = false;

  allListCheck:string = "";
  activeListCheck:string = "";
  passiveListCheck:string = "";

  title:string = "Aktif Şahıs Listesi";
  filterText:string="";

  name:string;
  address:string;
  gsm:string;
  surname:string;
  gender:string;
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
    private personService: PersonService,
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private userOperationClaimService : UserOperationClaimService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.userOperationClaimGetList();
    this.getList();
    this.createAddForm();
    this.createUpdateForm();
    this.userOperationClaimGetList();
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id:[0],
      name:[this.name,Validators.required],
      surname:[this.name,Validators.required],
      gender:[this.name,Validators.required],
      address:[""],
      gsm:[""],
      isActive: true
    })
  }
  
  createAddForm(){
    this.addForm = this.formBuilder.group({
      name:[this.name,Validators.required],
      surname:[""],
      address:[""],
      gsm:[""],
      gender:[""],
      isActive: true
    })
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
  exportExcel(){
    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'sheet1');

    XLSX.writeFile(wb,"Müşteri Listesi.xlsx");
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


  getListByCheck(text:string){

    if(text == "allList"){
      this.filterText="";
      this.title = "Tüm Şahıslar";
      this.activeList=false;
      this.passiveList = false;
      this.allListCheck = "checked";
      this.activeListCheck = "";
      this.passiveListCheck = "";
    }else if(text == "activeList"){
      this.filterText = "true";
      this.title = "Tüm Aktif Şahıslar";
      this.allList=false;
      this.passiveList=false
      this.allListCheck = "";
      this.activeListCheck = "checked";
      this.passiveListCheck = "";
    }else if(text == "passiveList"){
      this.filterText = "false";
      this.title="Tüm Pasif Şahıslar";
      this.allList = false;
      this.activeList = false;
      this.allListCheck = "";
      this.activeListCheck = "";
      this.passiveListCheck = "checked";
    }
  }

  deletePerson(person: Person){
    this.personService.deletePerson(person).subscribe((res)=>{
      this.toastr.success(res.message);
      this.getList();
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  changeStatusPerson(person: Person){
    person.isActive ? person.isActive = false : person.isActive = true; 
    this.personService.updatePerson(person).subscribe((res)=>{
      this.toastr.warning(res.message);
      this.getList();
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  getList(){
    this.personService.getList().subscribe((res)=>{
      this.people = res.data;
    })
  }

  addPerson(){
    if(this.addForm.valid){
      let personModel = Object.assign({}, this.addForm.value);
      this.personService.addPerson(personModel).subscribe((res)=>{
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

  updatePerson(){
    if(this.updateForm.valid){
      let personModel = Object.assign({}, this.updateForm.value);
      this.personService.updatePerson(personModel).subscribe((res)=>{
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

  getPerson(id:number){
    this.personService.getPerson(id).subscribe((res)=>{
      this.person = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["surname"].setValue(res.data.surname);
      this.updateForm.controls["address"].setValue(res.data.address);
      this.updateForm.controls["gender"].setValue(res.data.gender);
      this.updateForm.controls["gsm"].setValue(res.data.gsm);
    },(err)=>{
      this.toastr.error("Bir hata oluştu")
    })
  }

  currentCompany(person: Person){
    this.person = person;
  }
}
