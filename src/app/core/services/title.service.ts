import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Title } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private apiService: ApiService) {}

  get(key: string): Observable<Title[]> {
    return this.apiService
      .get('/counter/titles/?format=json&limit=10&key=' + key)
      .pipe(map(data => data['results']));
  }
}
