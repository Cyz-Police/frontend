import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CountysComponent } from './countys/countys.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypesComponent } from './types/types.component';
import { CommonListComponent } from './common-list/common-list.component';
import { CommonSearchbarComponent } from './common-searchbar/common-searchbar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CommonFilterPipe } from './pipes/common-filer.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent, CountysComponent, UsersComponent, CategoriesComponent, TypesComponent, CommonListComponent, CommonSearchbarComponent, UsersListComponent, CommonFilterPipe],
})
export class AdminDashboardModule { }
