import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifyRecolectionComponent } from './planify-recolection.component';

describe('PlanifyRecolectionComponent', () => {
  let component: PlanifyRecolectionComponent;
  let fixture: ComponentFixture<PlanifyRecolectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifyRecolectionComponent]
    });
    fixture = TestBed.createComponent(PlanifyRecolectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
