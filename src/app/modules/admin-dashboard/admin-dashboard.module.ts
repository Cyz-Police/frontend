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
import { CommonSearchbarComponent } from './components/common-searchbar/common-searchbar.component';
import { CommonFilterPipe } from './pipes/common-filer.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { CountyFilterPipe } from './pipes/counties-filter.pipe';
import { UserService } from './services/user.service';
import { CountyService } from './services/county.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { CategoryService } from './services/category.service';
import { TypeService } from './services/type.service';
import { AuthenticationService } from './../../authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AdminDashboardRoutingModule,
    FormsModule,
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent, CountiesComponent, UsersComponent, CategoriesComponent, TypesComponent, CommonSearchbarComponent, CommonFilterPipe, UsersFilterPipe, CountyFilterPipe, LoaderComponent, ToastComponent],
  providers: [
    UserService,
    CountyService,
    CategoryService,
    TypeService,
    AuthenticationService,
  ]
})
export class AdminDashboardModule { }
