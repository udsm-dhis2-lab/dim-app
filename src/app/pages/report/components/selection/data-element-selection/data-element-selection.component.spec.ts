import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataElementSelectionComponent } from './data-element-selection.component';

describe('DataElementSelectionComponent', () => {
  let component: DataElementSelectionComponent;
  let fixture: ComponentFixture<DataElementSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataElementSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataElementSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
