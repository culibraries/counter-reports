import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PublicationService } from './publication.service';

describe('PublisherService', () => {
  let injector: TestBed;
  let service: PublicationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicationService]
    });
    injector = getTestBed();
    service = injector.get(PublicationService);
    httpMock = injector.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
