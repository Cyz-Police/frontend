import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { CommonSearchbarComponent } from './components/common-searchbar/common-searchbar.component';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { UserServicesService } from './services/user-services.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { IndexComponent } from './components/index/index.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { ListComponent } from './components/list/list.component';
import { AuthenticationService } from './../../authentication/authentication.service';
import { ItemService } from './services/item.service';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component'; 

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: [
    IndexComponent, NavbarComponent, HeaderComponent,
    UsersComponent, CommonSearchbarComponent, LoaderComponent,
    ToastComponent, UsersFilterPipe, ItemSearchComponent, ListComponent, CircleLoaderComponent,
  ],
  providers: [
    AuthenticationService,
    UserServicesService,
    ItemService
  ]
})
export class DashboardModule { }
