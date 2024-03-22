import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEventsListingComponent } from './guest-events-listing.component';

describe('GuestEventsListingComponent', () => {
  let component: GuestEventsListingComponent;
  let fixture: ComponentFixture<GuestEventsListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestEventsListingComponent]
    });
    fixture = TestBed.createComponent(GuestEventsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
