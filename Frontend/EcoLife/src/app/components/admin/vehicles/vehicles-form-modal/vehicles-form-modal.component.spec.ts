import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesFormModalComponent } from './vehicles-form-modal.component';

describe('VehiclesFormModalComponent', () => {
  let component: VehiclesFormModalComponent;
  let fixture: ComponentFixture<VehiclesFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesFormModalComponent]
    });
    fixture = TestBed.createComponent(VehiclesFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
