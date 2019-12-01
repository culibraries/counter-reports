import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = env.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(API_URL + path, { params });
  }

  public getNextPage(path: string): Observable<any> {
    return this.httpClient.get(path);
  }

  public post(path: string, body: {}): Observable<any> {
    return this.httpClient.post(API_URL + path, body);
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(API_URL + path);
  }

  public put(path: string, body: {}): Observable<any> {
    return this.httpClient.put(API_URL + path, body);
  }
}
