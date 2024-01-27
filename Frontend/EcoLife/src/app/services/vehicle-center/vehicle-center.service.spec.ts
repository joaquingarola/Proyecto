import { TestBed } from '@angular/core/testing';

import { VehicleCenterService } from './vehicle-center.service';

describe('VehicleCenterService', () => {
  let service: VehicleCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
