import { TestBed } from '@angular/core/testing';

import { FilterDisplayService } from './filter-display.service';

describe('FilterDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterDisplayService = TestBed.get(FilterDisplayService);
    expect(service).toBeTruthy();
  });
});
