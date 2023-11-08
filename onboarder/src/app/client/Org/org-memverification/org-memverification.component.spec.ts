import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMemverificationComponent } from './org-memverification.component';

describe('OrgMemverificationComponent', () => {
  let component: OrgMemverificationComponent;
  let fixture: ComponentFixture<OrgMemverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgMemverificationComponent]
    });
    fixture = TestBed.createComponent(OrgMemverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
