import { TestBed } from '@angular/core/testing';

import { AppPreviewService } from './app-preview.service';

describe('AppPreviewService', () => {
  let service: AppPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
