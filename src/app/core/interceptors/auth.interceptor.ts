import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AlertService, AuthService } from '../services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Config } from '../config';

const config = Config.authenticationMessage;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private alert: AlertService,
    private router: Router,
    private auth: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.status === 200) {
              const token =
                typeof event.body.access !== 'undefined'
                  ? event.body.access
                  : localStorage.getItem('token');
              if (!this.auth.isAdmin(token)) {
                this.alert.danger(config.unauthorizedAccess);
                this.router.navigate(['/login']);
              }
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            let message = '';
            console.log(error);
            if (error.status === 401 || error.status === 403) {
              if (error.error.code && error.error.code === 'token_not_valid') {
                message = config.tokenisNotValid;
              } else {
                message = config.notExist;
              }
              this.alert.danger(message);
              this.router.navigate(['/login']);
              return;
            }
          }
        }
      )
    );
  }
}
