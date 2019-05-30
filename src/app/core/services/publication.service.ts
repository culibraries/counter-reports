import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Publication } from '../models';
import { map, switchMap } from 'rxjs/operators';
import { pureFunction2 } from '@angular/core/src/render3';

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
        switchMap(data => {
          if (data['count'] <= 100000) {
            return data.results;
          } else {
            const count = Math.ceil(data['count'] / 100000);
            return this.getByPageSize(count, filterParameterURL).pipe(
              map(folkJoinData => {
                for (let j = 0; j <= count - 2; j++) {
                  data.results = data.results.concat(
                    folkJoinData[j]['results']
                  );
                }
                return data.results;
              })
            );
          }
        })
      );
  }

  getByPageSize(count: number, filterParameterURL: string): any {
    const urls = [];

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
    return forkJoin(urls);
  }
}
