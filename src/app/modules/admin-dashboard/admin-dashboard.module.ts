import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CountiesComponent } from './components/counties/counties.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TypesComponent } from './components/types/types.component';
import { CommonListComponent } from './components/common-list/common-list.component';
import { CommonSearchbarComponent } from './components/common-searchbar/common-searchbar.component';
import { CommonFilterPipe } from './pipes/common-filer.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { CountyFilterPipe } from './pipes/counties-filter.pipe';
import { UserServicesService } from './services/user-services.service';
import { CountyService } from './services/county.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminDashboardRoutingModule,
    FormsModule,
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent, CountiesComponent, UsersComponent, CategoriesComponent, TypesComponent, CommonListComponent, CommonSearchbarComponent, CommonFilterPipe, UsersFilterPipe, CountyFilterPipe, LoaderComponent, ToastComponent],
  providers: [
    UserServicesService,
    CountyService
  ]
})
export class AdminDashboardModule { }
