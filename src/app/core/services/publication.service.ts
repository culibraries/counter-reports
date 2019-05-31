import { Injectable } from '@angular/core';
import { Observable, forkJoin, empty, of } from 'rxjs';
import { ApiService } from './api.service';
import { Publication } from '../models';
import { map, expand, concatMap, reduce } from 'rxjs/operators';

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

  getByPageNext(filterParameterURL: string): Observable<any> {
    console.log(filterParameterURL);
    const url =
      '/counter/publications/?format=json&page_size=100000&' +
      filterParameterURL;
    return this.apiService.get(url).pipe(
      expand((response: any) => {
        console.log(response);
        if (response && response.next) {
          console.log(response.next);
          return this.apiService.getNextPage(response.next);
        } else {
          return empty();
        }
      }),
      map(obj => obj),
      reduce((acc, x: any) => acc.concat([x.results]), [])
    );
  }
}
