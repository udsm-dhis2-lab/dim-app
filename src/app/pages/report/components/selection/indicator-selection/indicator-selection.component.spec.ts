import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorSelectionComponent } from './indicator-selection.component';

describe('IndicatorSelectionComponent', () => {
  let component: IndicatorSelectionComponent;
  let fixture: ComponentFixture<IndicatorSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
