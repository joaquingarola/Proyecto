import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceFormModalComponent } from './edit-maintenance-form-modal.component';

describe('EditMaintenanceFormModalComponent', () => {
  let component: EditMaintenanceFormModalComponent;
  let fixture: ComponentFixture<EditMaintenanceFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaintenanceFormModalComponent]
    });
    fixture = TestBed.createComponent(EditMaintenanceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
