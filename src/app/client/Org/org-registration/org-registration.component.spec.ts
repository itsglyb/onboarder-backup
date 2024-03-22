import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgRegistrationComponent } from './org-registration.component';

describe('OrgRegistrationComponent', () => {
  let component: OrgRegistrationComponent;
  let fixture: ComponentFixture<OrgRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgRegistrationComponent]
    });
    fixture = TestBed.createComponent(OrgRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
