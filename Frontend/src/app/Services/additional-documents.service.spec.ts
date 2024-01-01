import { TestBed } from '@angular/core/testing';

import { AdditionalDocumentsService } from './additional-documents.service';

describe('AdditionalDocumentsService', () => {
  let service: AdditionalDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
