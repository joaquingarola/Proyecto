import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNotValidModalComponent } from './route-not-valid-modal.component';

describe('RouteNotValidModalComponent', () => {
  let component: RouteNotValidModalComponent;
  let fixture: ComponentFixture<RouteNotValidModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteNotValidModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteNotValidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
