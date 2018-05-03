import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule'  },
  { path: 'admin/dashboard', loadChildren: 'app/modules/admin-dashboard/admin-dashboard.module#AdminDashboardModule'  },
  { path: 'authentication', loadChildren: 'app/modules/authentication/authentication.module#AuthenticationModule'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
