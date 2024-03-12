import { TestBed } from '@angular/core/testing';

import { RecolectionService } from './recolection.service';

describe('RecolectionService', () => {
  let service: RecolectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecolectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
