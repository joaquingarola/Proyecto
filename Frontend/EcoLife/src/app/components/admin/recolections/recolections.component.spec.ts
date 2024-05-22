import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecolectionsComponent } from './recolections.component';

describe('RecolectionsComponent', () => {
  let component: RecolectionsComponent;
  let fixture: ComponentFixture<RecolectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecolectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecolectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
