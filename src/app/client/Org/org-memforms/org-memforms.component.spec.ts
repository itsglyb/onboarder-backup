import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMemformsComponent } from './org-memforms.component';

describe('OrgMemformsComponent', () => {
  let component: OrgMemformsComponent;
  let fixture: ComponentFixture<OrgMemformsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgMemformsComponent]
    });
    fixture = TestBed.createComponent(OrgMemformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
