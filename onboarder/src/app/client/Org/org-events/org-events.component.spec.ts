import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgEventsComponent } from './org-events.component';

describe('OrgEventsComponent', () => {
  let component: OrgEventsComponent;
  let fixture: ComponentFixture<OrgEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventsComponent]
    });
    fixture = TestBed.createComponent(OrgEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
