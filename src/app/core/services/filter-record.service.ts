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

  delete(id: string) {
    return this.apiService.delete('/counter/filters/' + id);
  }

  save(filterRecord: FilterRecord): Observable<boolean> {
    // // If we're updating an existing article
    // if (article.slug) {
    //   return this.apiService.put('/articles/' + article.slug, {article: article})
    //     .pipe(map(data => data.article));

    // // Otherwise, create a new article
    // } else {
    console.log(filterRecord.toJson());
    return this.apiService
      .post('/counter/filters/', filterRecord.toJson())
      .pipe(map(data => data.filterRecord));
    // }
  }
}
