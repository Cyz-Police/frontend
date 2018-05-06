import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticationComponent } from './authentication.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent,
    children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
      { path: 'success', component: SuccessComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
