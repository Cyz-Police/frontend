import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication.component';

const Routes = [
  { path: 'authentication', component: AuthenticationComponent,
    children: [
      { path: 'register', component: RegistrationFormComponent },
      { path: 'login', component: LoginFormComponent }
    ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes)
  ],
  declarations: [LoginFormComponent, RegistrationFormComponent, HeaderComponent, AuthenticationComponent],
  exports: [RouterModule]
})
export class AuthenticationModule { }
