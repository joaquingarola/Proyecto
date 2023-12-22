import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPanelComponent } from './news-panel.component';

describe('NewsPanelComponent', () => {
  let component: NewsPanelComponent;
  let fixture: ComponentFixture<NewsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsPanelComponent]
    });
    fixture = TestBed.createComponent(NewsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
