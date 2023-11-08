import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCreateEventComponent } from './org-create-event.component';

describe('OrgCreateEventComponent', () => {
  let component: OrgCreateEventComponent;
  let fixture: ComponentFixture<OrgCreateEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgCreateEventComponent]
    });
    fixture = TestBed.createComponent(OrgCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
