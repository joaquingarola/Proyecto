import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecuentQuestionsComponent } from './frecuent-questions.component';

describe('FrecuentQuestionsComponent', () => {
  let component: FrecuentQuestionsComponent;
  let fixture: ComponentFixture<FrecuentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrecuentQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrecuentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
