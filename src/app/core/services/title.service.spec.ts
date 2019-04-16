import { TestBed, getTestBed } from '@angular/core/testing';
import { TitleService } from './title.service';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { Title } from '../models';

describe('TitleService', () => {
  let injector: TestBed;
  let titleService: TitleService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockObservableTitle = [{ id: 1, title: 'this is the title' }];
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [TitleService, { provide: ApiService, useValue: spy }]
    });
    injector = getTestBed();
    titleService = injector.get(TitleService);
    apiServiceSpy = injector.get(ApiService);
  });

  it('should return an Observable<Title[]>', () => {
    const title: Title[] = [{ id: 1, title: 'this is the title' }];
    apiServiceSpy.get.and.returnValue(of(title));
    titleService.getAll().subscribe(result => {
      expect(result.length).toBe(1);
      expect(result).toEqual(title);
    });
  });
});
