import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { CommonSearchbarComponent } from './components/common-searchbar/common-searchbar.component';
import { CommonFilterPipe } from './pipes/common-filer.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { UserServicesService } from './services/user-services.service';
import { CountyService } from './services/county.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { CategoryService } from './services/category.service';
import { TypeService } from './services/type.service';
import { IndexComponent } from './components/index/index.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    IndexComponent, NavbarComponent, HeaderComponent,
    UsersComponent, CommonSearchbarComponent, LoaderComponent,
    ToastComponent, UsersFilterPipe, CommonFilterPipe, ItemSearchComponent, ListComponent,
  ],
  providers: [
    UserServicesService,
  ]
})
export class DashboardModule { }
