import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectionComponent } from './batch-selection.component';

describe('BatchSelectionComponent', () => {
  let component: BatchSelectionComponent;
  let fixture: ComponentFixture<BatchSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
