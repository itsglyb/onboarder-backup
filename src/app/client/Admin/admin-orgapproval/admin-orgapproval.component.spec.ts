import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrgapprovalComponent } from './admin-orgapproval.component';

describe('AdminOrgapprovalComponent', () => {
  let component: AdminOrgapprovalComponent;
  let fixture: ComponentFixture<AdminOrgapprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrgapprovalComponent]
    });
    fixture = TestBed.createComponent(AdminOrgapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
