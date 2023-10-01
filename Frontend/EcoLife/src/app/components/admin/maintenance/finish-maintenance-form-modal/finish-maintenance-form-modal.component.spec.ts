import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishMaintenanceFormModalComponent } from './finish-maintenance-form-modal.component';

describe('FinishMaintenanceFormModalComponent', () => {
  let component: FinishMaintenanceFormModalComponent;
  let fixture: ComponentFixture<FinishMaintenanceFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishMaintenanceFormModalComponent]
    });
    fixture = TestBed.createComponent(FinishMaintenanceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
