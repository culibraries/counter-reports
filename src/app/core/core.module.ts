import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, PlatformService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, PlatformService]
})
export class CoreModule {}
