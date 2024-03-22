import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemOrgprofileComponent } from './mem-orgprofile.component';

describe('MemOrgprofileComponent', () => {
  let component: MemOrgprofileComponent;
  let fixture: ComponentFixture<MemOrgprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemOrgprofileComponent]
    });
    fixture = TestBed.createComponent(MemOrgprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
