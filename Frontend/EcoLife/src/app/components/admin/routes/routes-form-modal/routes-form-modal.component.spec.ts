import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesFormModalComponent } from './routes-form-modal.component';

describe('RoutesFormModalComponent', () => {
  let component: RoutesFormModalComponent;
  let fixture: ComponentFixture<RoutesFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesFormModalComponent]
    });
    fixture = TestBed.createComponent(RoutesFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
