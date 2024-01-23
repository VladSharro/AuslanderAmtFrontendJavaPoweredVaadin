import { TestBed } from '@angular/core/testing';

import { MaillingService } from './mailling.service';

describe('MaillingService', () => {
  let service: MaillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
