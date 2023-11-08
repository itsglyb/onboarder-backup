import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemEventsComponent } from './mem-events.component';

describe('MemEventsComponent', () => {
  let component: MemEventsComponent;
  let fixture: ComponentFixture<MemEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemEventsComponent]
    });
    fixture = TestBed.createComponent(MemEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
