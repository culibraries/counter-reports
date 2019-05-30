import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from './api.service';
import { Publication } from '../models';
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

  getByFilters(filterParameterURL: string): any {
    return this.apiService
      .get(
        '/counter/publications/?format=json&page_size=100000&' +
          filterParameterURL
      )
      .pipe(
        map(data => {
          if (data['count'] <= 100000) {
            return data.results;
          } else {
            const count = Math.ceil(data['count'] / 100000);
            return this.getByPageSize(data.results, count, filterParameterURL);
          }
        })
      );
  }

  getByPageSize(
    firstPageData: any,
    count: number,
    filterParameterURL: string
  ): any {
    const urls = [];
    let results = firstPageData;

    for (let i = 2; i <= count; i++) {
      urls.push(
        this.apiService
          .get(
            '/counter/publications/?format=json&page_size=100000&page=' +
              i +
              '&' +
              filterParameterURL
          )
          .pipe(map(data => data))
      );
    }

    forkJoin(...urls).subscribe(data => {
      data.forEach(element => {
        results = results.concat(element.results);
      });
    });

    return results;
  }
}
