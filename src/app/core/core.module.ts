import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

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
  ValidatorService,
  FilterRecordService,
  StaticService,
  ErrorService,
} from './services';
import { DataHelper } from './helpers';

import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
  ],
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
    FilterRecordService,
    StaticService,
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
