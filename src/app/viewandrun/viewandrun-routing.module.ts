import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewandrunComponent } from './viewandrun.component';

const routes: Routes = [
  {
    path: '',
    component: ViewandrunComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewandrunRoutingModule {}
