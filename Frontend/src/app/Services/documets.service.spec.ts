import { TestBed } from '@angular/core/testing';

import { DocumetsService } from './documets.service';

describe('DocumetsService', () => {
  let service: DocumetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
