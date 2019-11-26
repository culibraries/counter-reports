import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { ApiService } from './api.service';
import { map, expand, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  constructor(private apiService: ApiService) {}

  getByPageNext(filterParameterURL: string): Observable<any> {
    const url =
      '/counter/publications/?format=json&page_size=100000&' +
      filterParameterURL;
    return this.apiService.get(url).pipe(
      expand((response: any) => {
        if (response && response.next) {
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
