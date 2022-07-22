import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  isRegisterButtonActive :boolean = true;
  isRegisterComplete :boolean = false;

  constructor(private authService: AuthService, private formBuilder:FormBuilder, private toastr:ToastrService, private router : Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      name:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  register(){
    if(this.registerForm.valid){
      this.isRegisterButtonActive = false;
      let registerModel = Object.assign({
      },this.registerForm.value);
      this.authService.register(registerModel).subscribe((res)=>{
        this.isRegisterComplete = true;
      },(err)=>{
        this.isRegisterButtonActive = true;
        this.toastr.error(err.error)
      })
  }else{
    this.toastr.error("Eksik bilgileri doldurun!","Hata")
  }
}
}