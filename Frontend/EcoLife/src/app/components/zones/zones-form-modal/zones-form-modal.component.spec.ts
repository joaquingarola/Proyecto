import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesFormModalComponent } from './zones-form-modal.component';

describe('ZonesFormModalComponent', () => {
  let component: ZonesFormModalComponent;
  let fixture: ComponentFixture<ZonesFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonesFormModalComponent]
    });
    fixture = TestBed.createComponent(ZonesFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
