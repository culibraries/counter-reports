import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = env.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken'),
  });

  constructor(private httpClient: HttpClient) {}

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.httpClient.get(API_URL + path, {
      headers: this.headers,
      params,
    });
  }

  public logout(path: string): Observable<any> {
    return this.httpClient.get(API_URL + path, { responseType: 'text' });
  }

  public getNextPage(path: string): Observable<any> {
    return this.httpClient.get(path);
  }

  public post(path: string, body: {}): Observable<any> {
    return this.httpClient.post(API_URL + path, body, {
      headers: this.headers,
    });
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(API_URL + path, { headers: this.headers });
  }

  public put(path: string, body: {}): Observable<any> {
    return this.httpClient.put(API_URL + path, body, { headers: this.headers });
  }

  public getCookie(name: string): string {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }
}
