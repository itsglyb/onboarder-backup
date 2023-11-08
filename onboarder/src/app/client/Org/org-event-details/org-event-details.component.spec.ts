import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEventDetailsComponent } from './org-event-details.component';

describe('OrgEventDetailsComponent', () => {
  let component: OrgEventDetailsComponent;
  let fixture: ComponentFixture<OrgEventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventDetailsComponent]
    });
    fixture = TestBed.createComponent(OrgEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
