// import { TestBed, getTestBed } from '@angular/core/testing';

// import { FilterRecord } from '../models';
// import { ApiService } from './api.service';
// import { of } from 'rxjs';
// import { FilterRecordService } from './filter-record.service';

// describe('PlatformService', () => {
//   let injector: TestBed;
//   let filterRecordService: FilterRecordService;
//   let apiServiceSpy: jasmine.SpyObj<ApiService>;

//   const mockObservablePlatform = [
//     {
//       name: 'name',
//       description: 'description',
//       owner: 'owner',
//       params: 'params',
//       created_at: '2019',
//       updated_at: '2019'
//     },
//     {
//       name: 'name',
//       description: 'description',
//       owner: 'owner',
//       params: 'params',
//       created_at: '2019',
//       updated_at: '2019'
//     },
//     {
//       name: 'name',
//       description: 'description',
//       owner: 'owner',
//       params: 'params',
//       created_at: '2019',
//       updated_at: '2019'
//     }
//   ];
//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('ApiService', ['get']);

//     TestBed.configureTestingModule({
//       imports: [],
//       providers: [FilterRecordService, { provide: ApiService, useValue: spy }]
//     });
//     injector = getTestBed();
//     filterRecordService = injector.get(FilterRecordService);
//     apiServiceSpy = injector.get(ApiService);
//   });

//   it('should return an Observable<Platform[]>', () => {
//     const filterRecord: FilterRecord[] = [
//       {
//         name: 'name',
//         description: 'description',
//         owner: 'owner',
//         params: 'params',
//         created_at: '2019',
//         updated_at: '2019'
//       },
//       {
//         name: 'name',
//         description: 'description',
//         owner: 'owner',
//         params: 'params',
//         created_at: '2019',
//         updated_at: '2019'
//       },
//       {
//         name: 'name',
//         description: 'description',
//         owner: 'owner',
//         params: 'params',
//         created_at: '2019',
//         updated_at: '2019'
//       }
//     ];
//     apiServiceSpy.get.and.returnValue(of(filterRecord));
//     filterRecordService.getAll().subscribe(result => {
//       expect(result.length).toBe(3);
//       expect(result).toEqual(filterRecord);
//     });
//   });
// });
