import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemLoginComponent } from './mem-login.component';

describe('MemLoginComponent', () => {
  let component: MemLoginComponent;
  let fixture: ComponentFixture<MemLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemLoginComponent]
    });
    fixture = TestBed.createComponent(MemLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
