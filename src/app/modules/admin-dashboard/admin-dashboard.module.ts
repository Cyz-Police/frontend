import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CountiesComponent } from './counties/counties.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypesComponent } from './types/types.component';
import { CommonListComponent } from './common-list/common-list.component';
import { CommonSearchbarComponent } from './common-searchbar/common-searchbar.component';
import { CommonFilterPipe } from './pipes/common-filer.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { CountyFilterPipe } from './pipes/counties-filter.pipe';
import { UserServicesService } from './services/user-services.service';
import { CountyService } from './services/county.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent, CountiesComponent, UsersComponent, CategoriesComponent, TypesComponent, CommonListComponent, CommonSearchbarComponent, CommonFilterPipe, UsersFilterPipe, CountyFilterPipe, LoaderComponent],
  providers: [
    UserServicesService,
    CountyService
  ]
})
export class AdminDashboardModule { }
