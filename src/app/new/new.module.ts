import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { NewRoutingModule } from './new-routing.module';
import { FilterComponent } from './filter/filter.component';
import { DataListComponent } from './data-list/data-list.component';
import { NewComponent } from './new.component';

@NgModule({
  declarations: [FilterComponent, DataListComponent, NewComponent],
  imports: [CommonModule, NewRoutingModule, MatTableModule]
})
export class NewModule {}
