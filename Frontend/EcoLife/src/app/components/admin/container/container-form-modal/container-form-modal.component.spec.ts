import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormModalComponent } from './container-form-modal.component';

describe('ContainerFormModalComponent', () => {
  let component: ContainerFormModalComponent;
  let fixture: ComponentFixture<ContainerFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerFormModalComponent]
    });
    fixture = TestBed.createComponent(ContainerFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
