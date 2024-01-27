import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCenterFormModalComponent } from './vehicle-center-form-modal.component';

describe('VehicleCenterFormModalComponent', () => {
  let component: VehicleCenterFormModalComponent;
  let fixture: ComponentFixture<VehicleCenterFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleCenterFormModalComponent]
    });
    fixture = TestBed.createComponent(VehicleCenterFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
