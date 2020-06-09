import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyNotificationComponent } from './empty-notification.component';

describe('EmptyNotificationComponent', () => {
  let component: EmptyNotificationComponent;
  let fixture: ComponentFixture<EmptyNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
