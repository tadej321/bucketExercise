import { TestBed } from '@angular/core/testing';

import { BucketContentService } from './bucket-content.service';

describe('BucketContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BucketContentService = TestBed.get(BucketContentService);
    expect(service).toBeTruthy();
  });
});
