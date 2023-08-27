import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyMaintenanceFormModalComponent } from './notify-maintenance-form-modal.component';

describe('NotifyMaintenanceFormModalComponent', () => {
  let component: NotifyMaintenanceFormModalComponent;
  let fixture: ComponentFixture<NotifyMaintenanceFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyMaintenanceFormModalComponent]
    });
    fixture = TestBed.createComponent(NotifyMaintenanceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
