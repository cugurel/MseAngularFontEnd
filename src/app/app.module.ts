import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CompanyComponent } from './components/company/company.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CompanyPipe } from './pipe/company.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CompanyFilterPipe } from './pipe/company-filter.pipe';
import { PersonComponent } from './components/person/person.component';
import { PersonPipe } from './pipe/person.pipe';
import { PersonFilterPipe } from './pipe/person-filter.pipe';
import { LocalChargeComponent } from './components/local-charge/local-charge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    StatisticComponent,
    SidenavComponent,
    CompanyComponent,
    CompanyPipe,
    CompanyFilterPipe,
    PersonComponent,
    PersonPipe,
    PersonFilterPipe,
    LocalChargeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut : 3000,
      progressBar:true,
      closeButton : true
    }),
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {provide:'apiUrl', useValue:'http://localhost:5262/api/'},
    {provide : HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
