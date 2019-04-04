import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Publication } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Publication[]> {
    return this.apiService.get('/publications/').pipe(map(data => data));
  }
  getByFilters(publishers, title): Observable<Publication[]> {
    return this.apiService
      .get('/publications/' + publishers + '/' + title)
      .pipe(map(data => data));
  }
}
