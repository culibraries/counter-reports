import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const userUrl = environment.apiUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => {
        sessionStorage.setItem('username', data['username']);
      },
      err => this.login(), // This will redirect to the system login page
      () => void 0
    );
  }

  public getUserInformation() {
    return this.http.get(userUrl);
  }

  getUserName(): string {
    return sessionStorage.getItem('username');
  }

  isUser(currentUser: string): boolean {
    return currentUser === this.getUserName() ? true : false;
  }

  public login() {
    return (window.location.href =
      environment.apiUrl + '/api-saml/sso/saml?next=/reports/counter');
  }
}
