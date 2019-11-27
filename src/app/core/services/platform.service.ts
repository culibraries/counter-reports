import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Platform } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private apiService: ApiService) {}
  get(key: string): Observable<Platform[]> {
    return this.apiService
      .get('/counter/platforms/?format=json&limit=10&key=' + key)
      .pipe(map(data => data['results']));
  }
}
