import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FilterRecord } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterRecordService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<FilterRecord[]> {
    return this.apiService
      .get('/counter/filters/?format=json')
      .pipe(map(data => data));
  }

  getById(id: number): Observable<FilterRecord> {
    return this.apiService
      .get('/counter/filters/' + id)
      .pipe(map(data => data));
  }

  delete(id: number) {
    return this.apiService.delete('/counter/filters/' + id);
  }

  save(filterRecord: FilterRecord): Observable<boolean> {
    return this.apiService
      .post('/counter/filters/', filterRecord.toJson())
      .pipe(map(data => data.filterRecord));
  }

  update(filterRecord: FilterRecord, id: number): Observable<boolean> {
    return this.apiService
      .put('/counter/filters/' + id + '/', filterRecord.toJson())
      .pipe(map(data => data.filterRecord));
  }
}
