import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { CountiesComponent } from './components/counties/counties.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TypesComponent } from './components/types/types.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'countys', component: CountiesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'types', component: TypesComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
