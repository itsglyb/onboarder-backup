import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgNavbarComponent } from './org-navbar.component';

describe('OrgNavbarComponent', () => {
  let component: OrgNavbarComponent;
  let fixture: ComponentFixture<OrgNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgNavbarComponent]
    });
    fixture = TestBed.createComponent(OrgNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
