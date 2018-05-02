import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication.component';


@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  declarations: [LoginFormComponent, RegistrationFormComponent, HeaderComponent, AuthenticationComponent],
})
export class AuthenticationModule { }
