import { TestBed } from '@angular/core/testing';

import { LumbercampService } from './lumbercamp.service';

describe('LumbercampService', () => {
  let service: LumbercampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LumbercampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
