import { TestBed } from '@angular/core/testing';

import { WasteCenterService } from './waste-center.service';

describe('WasteCenterService', () => {
  let service: WasteCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
