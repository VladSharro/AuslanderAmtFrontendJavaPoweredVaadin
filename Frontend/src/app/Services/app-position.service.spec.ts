import { TestBed } from '@angular/core/testing';

import { AppPositionService } from './app-position.service';

describe('AppPositionService', () => {
  let service: AppPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
