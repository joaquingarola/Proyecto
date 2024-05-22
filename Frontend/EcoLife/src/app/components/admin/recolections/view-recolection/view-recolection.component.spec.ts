import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecolectionComponent } from './view-recolection.component';

describe('ViewRecolectionComponent', () => {
  let component: ViewRecolectionComponent;
  let fixture: ComponentFixture<ViewRecolectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecolectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRecolectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
