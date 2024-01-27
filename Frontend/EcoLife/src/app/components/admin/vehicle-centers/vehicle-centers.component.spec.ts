import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCentersComponent } from './vehicle-centers.component';

describe('VehicleCentersComponent', () => {
  let component: VehicleCentersComponent;
  let fixture: ComponentFixture<VehicleCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleCentersComponent]
    });
    fixture = TestBed.createComponent(VehicleCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
