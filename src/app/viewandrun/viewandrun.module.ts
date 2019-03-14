import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewandrunComponent } from './viewandrun.component';
import { ViewandrunRoutingModule } from './viewandrun-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ViewandrunComponent],
  imports: [
    CommonModule,
    ViewandrunRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class ViewandrunModule {}
