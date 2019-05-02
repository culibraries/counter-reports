import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Publication, Filter } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Publication[]> {
    return this.apiService
      .get('/counter/publications/?format=json')
      .pipe(map(data => data));
  }
  getByFilters(filterParameterURL: string): Observable<Publication[]> {
    return this.apiService
      .get('/counter/publications/?' + filterParameterURL)
      .pipe(map(data => data));
  }
}
