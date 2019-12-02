import { TestBed, getTestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let injector: TestBed;
  let alertService: AlertService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('snackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule],
      providers: [AlertService, { provide: MatSnackBar, useValue: spy }]
    });

    injector = getTestBed();
    alertService = injector.get(AlertService);
    snackBarSpy = injector.get(MatSnackBar);
  });

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });

  it('should call snackBar when its DANGER', () => {
    expect(alertService.danger('this is danger')).toBe(MatSnackBar);
  });
});
