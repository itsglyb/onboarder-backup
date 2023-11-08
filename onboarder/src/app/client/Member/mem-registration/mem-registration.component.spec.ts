import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemRegistrationComponent } from './mem-registration.component';

describe('MemRegistrationComponent', () => {
  let component: MemRegistrationComponent;
  let fixture: ComponentFixture<MemRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemRegistrationComponent]
    });
    fixture = TestBed.createComponent(MemRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
