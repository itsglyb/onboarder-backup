import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMembersComponent } from './org-members.component';

describe('OrgMembersComponent', () => {
  let component: OrgMembersComponent;
  let fixture: ComponentFixture<OrgMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgMembersComponent]
    });
    fixture = TestBed.createComponent(OrgMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
