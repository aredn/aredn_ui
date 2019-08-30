import { TestBed } from '@angular/core/testing';

import { ChartPageDataService } from './chart-page-data.service';

describe('ChartPageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartPageDataService = TestBed.get(ChartPageDataService);
    expect(service).toBeTruthy();
  });
});
