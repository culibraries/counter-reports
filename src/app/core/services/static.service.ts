import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  constructor(private apiService: ApiService) {}

  get(): Observable<{}> {
    return this.apiService.get('/counter/static').pipe(map(data => data));
  }
}
