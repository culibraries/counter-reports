import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'new-reports',
        loadChildren: () => import('./new/new.module').then(m => m.NewModule),
      },
      {
        path: 'viewandrun',
        loadChildren: () =>
          import('./viewandrun/viewandrun.module').then(
            m => m.ViewandrunModule
          ),
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
