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

const Routes = [
  { path: 'dashboard', component: AdminDashboardComponent,
    children: [
      { path: 'countys', component: CountysComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'types', component: TypesComponent }
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes)
  ],
  declarations: [HeaderComponent, NavbarComponent, AdminDashboardComponent, CountysComponent, UsersComponent, CategoriesComponent, TypesComponent],
  exports: [RouterModule]
})
export class AdminDashboardModule { }
