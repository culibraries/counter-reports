import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  constructor(
    private injector: Injector,
    private ngZone: NgZone,
  ) {}
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      let code = 0;
      if (!navigator.onLine) {
        code = 0;
      }
      code = error.status;
      if (code !== 403) {
        this.ngZone.run(() => router.navigate(['error/' + code]));
      }
    }
  }
}
