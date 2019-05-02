import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  PlatformService,
  PublisherService,
  PublicationService,
  TitleService,
  AlertService,
  AuthService,
  AuthGuardService,
  ExportExcelService,
  ValidatorService
} from './services';
import { DataHelper } from './helpers';
import { httpInterceptorProviders } from '../core/interceptors';

import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  providers: [
    ApiService,
    PlatformService,
    PublisherService,
    PublicationService,
    TitleService,
    AlertService,
    AuthService,
    AuthGuardService,
    ExportExcelService,
    DataHelper,
    ValidatorService,
    httpInterceptorProviders
  ]
})
export class CoreModule {}
