import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { env } from '../../../environments/environment';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  const dummyParams = new HttpParams().set('q', 'dummy');
  const anyValue = [{}, {}];
  it('should return an Observable<any> with parameter in the URL', () => {
    service.get('/any', dummyParams).subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(anyValue);
    });
    const req = httpMock.expectOne({
      method: 'GET',
      url: `${env.apiUrl}/any?q=dummy`
    });

    expect(req.request.urlWithParams).toBe(`${env.apiUrl}/any?q=dummy`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params).toEqual(dummyParams);
    req.flush(anyValue);
  });

  it('should return an Observable<any> with-OUT parameter in the URL', () => {
    service.get('/any').subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(anyValue);
    });
    const req = httpMock.expectOne({
      method: 'GET',
      url: `${env.apiUrl}/any`
    });

    expect(req.request.url).toBe(`${env.apiUrl}/any`);
    expect(req.request.method).toEqual('GET');
    req.flush(anyValue);
  });
});
