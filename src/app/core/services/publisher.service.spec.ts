import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PublisherService } from './publisher.service';

describe('PublisherService', () => {
  let injector: TestBed;
  let service: PublisherService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublisherService]
    });
    injector = getTestBed();
    service = injector.get(PublisherService);
    httpMock = injector.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
