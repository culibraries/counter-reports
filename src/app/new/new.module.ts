import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NewRoutingModule } from './new-routing.module';
import { FilterComponent } from './filter/filter.component';
import { DataListComponent } from './data-list/data-list.component';
import { NewComponent } from './new.component';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgProgressModule } from '@ngx-progressbar/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FilterComponent,
    DataListComponent,
    NewComponent,
    FilterItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgProgressModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
})
export class NewModule {}
