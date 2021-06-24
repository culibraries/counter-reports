// import {
//   async,
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   tick
// } from '@angular/core/testing';
// import { Location } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';

// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { HeaderComponent } from './header.component';
// import { MatMenuModule } from '@angular/material/menu';
// import { DashboardModule } from '../../../dashboard/dashboard.module';
// import { NewModule } from '../../../new/new.module';
// import { ViewandrunModule } from '../../../viewandrun/viewandrun.module';
// import { Routes, Router, RouterModule } from '@angular/router';
// import { NgModuleFactoryLoader } from '@angular/core';

// describe('HeaderComponent: ', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let location: Location;
//   let router: Router;
//   let loader: any;

//   const routes: Routes = [
//     {
//       path: '',
//       redirectTo: 'dashboard',
//       pathMatch: 'full'
//     },
//     {
//       path: 'dashboard',
//       loadChildren: './dashboard/dashboard.module#DashboardModule'
//     },
//     {
//       path: 'new-reports',
//       loadChildren: './new/new.module#NewModule'
//     },
//     {
//       path: 'viewandrun',
//       loadChildren: './viewandrun/viewandrun.module#ViewandrunModule'
//     }
//   ];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         MatIconModule,
//         MatButtonModule,
//         MatMenuModule,
//         NewModule,
//         RouterTestingModule.withRoutes(routes)
//       ],
//       declarations: [HeaderComponent],
//       providers: [Location]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);
//     router.resetConfig([
//       {
//         path: 'dashboard',
//         loadChildren: 'DashboardModule'
//       },
//       {
//         path: 'new-report',
//         loadChildren: 'NewModule'
//       },
//       {
//         path: 'viewandrun',
//         loadChildren: 'ViewandrunModule'
//       }
//     ]);
//     loader = TestBed.inject(NgModuleFactoryLoader);
//     loader.stubbedModules = {
//       DashboardModule,
//       NewModule,
//       ViewandrunModule
//     };
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     router.initialNavigation();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`should have a title 'Counter Reports'`, () => {
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('header').textContent).toContain(
//       'Counter Reports'
//     );
//   });

//   it(`should '/' navigate to DashboardModule`, fakeAsync(() => {
//     router.navigate(['dashboard']);
//     tick();
//     expect(location.path()).toBe('/dashboard');
//   }));

//   it(`should '/new-report' navigate to NewModule`, fakeAsync(() => {
//     router.navigate(['new-report']);
//     tick();
//     expect(location.path()).toBe('/new-report');
//   }));

//   it(`should '/viewandrun' navigate to ViewandrunModule`, fakeAsync(() => {
//     router.navigate(['viewandrun']);
//     tick();
//     expect(location.path()).toBe('/viewandrun');
//   }));
// });
