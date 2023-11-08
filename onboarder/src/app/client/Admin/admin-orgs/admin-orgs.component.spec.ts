import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrgsComponent } from './admin-orgs.component';

describe('AdminOrgsComponent', () => {
  let component: AdminOrgsComponent;
  let fixture: ComponentFixture<AdminOrgsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrgsComponent]
    });
    fixture = TestBed.createComponent(AdminOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
