import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenCommentsComponent } from './citizen-comments.component';

describe('CitizenCommentsComponent', () => {
  let component: CitizenCommentsComponent;
  let fixture: ComponentFixture<CitizenCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitizenCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
