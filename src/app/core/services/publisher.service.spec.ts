import { TestBed, getTestBed } from '@angular/core/testing';
import { PublisherService } from './publisher.service';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { Publisher } from '../models';

describe('PublisherService', () => {
  let injector: TestBed;
  let publisherService: PublisherService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockObservablePublisher = [{ name: 'ACM' }];
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [PublisherService, { provide: ApiService, useValue: spy }]
    });
    injector = getTestBed();
    publisherService = injector.get(PublisherService);
    apiServiceSpy = injector.get(ApiService);
  });

  it('should return an Observable<Publisher[]>', () => {
    const publisher: Publisher[] = [{ name: 'ACM' }];
    apiServiceSpy.get.and.returnValue(of(publisher));
    publisherService.getAll().subscribe(result => {
      expect(result.length).toBe(1);
      expect(result).toEqual(publisher);
    });
  });
});
