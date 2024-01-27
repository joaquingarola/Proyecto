import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCentersComponent } from './waste-centers.component';

describe('WasteCentersComponent', () => {
  let component: WasteCentersComponent;
  let fixture: ComponentFixture<WasteCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WasteCentersComponent]
    });
    fixture = TestBed.createComponent(WasteCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
