import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { HttpModule } from '@angular/http';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './../../authentication/authentication.service';
import { CountyService } from './services/county.service';
import { UserService } from './services/user.service';


@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [AuthenticationService, CountyService, UserService],
  declarations: [LoginFormComponent, RegistrationFormComponent, HeaderComponent, AuthenticationComponent],
})
export class AuthenticationModule { }
