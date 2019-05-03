import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Config } from '../config';

const group = Config.group;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(private apiService: ApiService) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token) && this.isAdmin(token)) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(token): boolean {
    const tokenPayload = this.jwtHelper.decodeToken(token);
    if (tokenPayload.groups.includes(group)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  isTokenExist(): boolean {
    return localStorage.hasOwnProperty('token');
  }

  login(username: string, password: string) {
    return this.apiService.post('/token/', { username, password }).pipe(
      map(data => {
        localStorage.setItem('token', data.access);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
