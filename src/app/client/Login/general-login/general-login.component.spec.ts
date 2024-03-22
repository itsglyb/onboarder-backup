import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLoginComponent } from './general-login.component';

describe('GeneralLoginComponent', () => {
  let component: GeneralLoginComponent;
  let fixture: ComponentFixture<GeneralLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLoginComponent]
    });
    fixture = TestBed.createComponent(GeneralLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
