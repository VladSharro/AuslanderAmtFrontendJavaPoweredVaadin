import { TestBed } from '@angular/core/testing';

import { DownloadApplicationService } from './download-application.service';

describe('DownloadApplicationService', () => {
  let service: DownloadApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
