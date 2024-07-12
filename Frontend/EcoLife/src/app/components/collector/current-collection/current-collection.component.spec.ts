import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCollectionComponent } from './current-collection.component';

describe('CurrentCollectionComponent', () => {
  let component: CurrentCollectionComponent;
  let fixture: ComponentFixture<CurrentCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
