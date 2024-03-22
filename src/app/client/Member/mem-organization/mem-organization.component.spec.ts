import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemOrganizationComponent } from './mem-organization.component';

describe('MemOrganizationComponent', () => {
  let component: MemOrganizationComponent;
  let fixture: ComponentFixture<MemOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemOrganizationComponent]
    });
    fixture = TestBed.createComponent(MemOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
