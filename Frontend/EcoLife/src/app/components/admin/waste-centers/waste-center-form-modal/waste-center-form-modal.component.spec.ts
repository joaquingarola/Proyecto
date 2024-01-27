import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCenterFormModalComponent } from './waste-center-form-modal.component';

describe('WasteCenterFormModalComponent', () => {
  let component: WasteCenterFormModalComponent;
  let fixture: ComponentFixture<WasteCenterFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WasteCenterFormModalComponent]
    });
    fixture = TestBed.createComponent(WasteCenterFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
