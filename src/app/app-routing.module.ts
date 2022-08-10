import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { HomeComponent } from './components/home/home.component';
import { LocalChargeComponent } from './components/local-charge/local-charge.component';
import { LoginComponent } from './components/login/login.component';
import { PersonComponent } from './components/person/person.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes : Routes = [
  {path:'', component:HomeComponent,canActivate:[LoginGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'company', component:CompanyComponent},
  {path:'person', component:PersonComponent},
  {path:'localcharge', component:LocalChargeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
