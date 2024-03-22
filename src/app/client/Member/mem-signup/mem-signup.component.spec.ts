import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemSignupComponent } from './mem-signup.component';

describe('MemSignupComponent', () => {
  let component: MemSignupComponent;
  let fixture: ComponentFixture<MemSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemSignupComponent]
    });
    fixture = TestBed.createComponent(MemSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
