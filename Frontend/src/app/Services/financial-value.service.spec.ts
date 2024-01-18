import { TestBed } from '@angular/core/testing';

import { FinancialValueService } from './financial-value.service';

describe('FinancialValueService', () => {
  let service: FinancialValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
