import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  PlatformService,
  PublisherService,
  PublicationService,
  TitleService,
  AlertService
} from './services';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    ApiService,
    PlatformService,
    PublisherService,
    PublicationService,
    TitleService,
    AlertService
  ]
})
export class CoreModule {}
