import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Platform } from '../models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Platform[]> {
    return this.apiService.get('/platforms/').pipe(map(data => data));
  }
}
