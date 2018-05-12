import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { ItemSearchComponent} from './components/item-search/item-search.component';
import { UsersComponent } from './components/users/users.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: UsersComponent },
      { path: 'search', component: ItemSearchComponent},
      { path: 'list', component: ListComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
