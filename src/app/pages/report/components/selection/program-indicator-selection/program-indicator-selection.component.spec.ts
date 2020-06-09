import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramIndicatorSelectionComponent } from './program-indicator-selection.component';

describe('ProgramIndicatorSelectionComponent', () => {
  let component: ProgramIndicatorSelectionComponent;
  let fixture: ComponentFixture<ProgramIndicatorSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramIndicatorSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramIndicatorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
