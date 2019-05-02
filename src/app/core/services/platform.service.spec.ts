import { TestBed, getTestBed } from '@angular/core/testing';

import { PlatformService } from './platform.service';
import { Platform } from '../models';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('PlatformService', () => {
  let injector: TestBed;
  let platformService: PlatformService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockObservablePlatform = [
    { name: 'ACM Digital Library' },
    { name: 'ACS Publications' },
    { name: 'AEA Publications' }
  ];
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [PlatformService, { provide: ApiService, useValue: spy }]
    });
    injector = getTestBed();
    platformService = injector.get(PlatformService);
    apiServiceSpy = injector.get(ApiService);
  });

  it('should return an Observable<Platform[]>', () => {
    const platform: Platform[] = [
      { name: 'ACM Digital Library' },
      { name: 'ACS Publications' },
      { name: 'AEA Publications' }
    ];
    apiServiceSpy.get.and.returnValue(of(platform));
    platformService.getAll().subscribe(result => {
      expect(result.length).toBe(3);
      expect(result).toEqual(platform);
    });
  });
});
