import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Publisher } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  constructor(private apiService: ApiService) {}

  get(key: string): Observable<Publisher[]> {
    return this.apiService
      .get('/counter/publishers/?format=json&limit=20&key=' + key)
      .pipe(map(data => data['results']));
  }
}
