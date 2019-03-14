import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'new-reports',
    loadChildren: './new/new.module#NewModule'
  },
  {
    path: 'viewandrun',
    loadChildren: './viewandrun/viewandrun.module#ViewandrunModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
