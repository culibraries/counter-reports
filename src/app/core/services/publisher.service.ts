import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Publisher } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Publisher[]> {
    return this.apiService
      .get('/publishers?ordering=name')
      .pipe(map(data => data.results));
  }
}
