import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

const Routes = [
  { path: 'dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes)
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent],
  exports: [RouterModule]
})
export class AdminDashboardModule { }
