import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { MonthConvertPipe } from './pipes/month-convert.pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppLayoutComponent,
    MonthConvertPipe,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [MonthConvertPipe]
})
export class SharedModule {}
