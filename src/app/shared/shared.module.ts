import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SaveModalBoxComponent } from './save-modal-box/save-modal-box.component';

import { MonthConvertPipe } from './pipes/month-convert.pipe';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppLayoutComponent,
    MonthConvertPipe,
    HeaderComponent,
    SaveModalBoxComponent,
    ConfirmComponent
  ],
  entryComponents: [SaveModalBoxComponent, ConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [MonthConvertPipe]
})
export class SharedModule {}
