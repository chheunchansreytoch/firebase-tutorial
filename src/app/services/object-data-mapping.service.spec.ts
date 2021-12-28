import { TestBed } from '@angular/core/testing';

import { ObjectDataMappingService } from './object-data-mapping.service';

describe('ObjectDataMappingService', () => {
  let service: ObjectDataMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectDataMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
