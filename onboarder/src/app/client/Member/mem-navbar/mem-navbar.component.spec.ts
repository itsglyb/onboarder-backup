import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemNavbarComponent } from './mem-navbar.component';

describe('MemNavbarComponent', () => {
  let component: MemNavbarComponent;
  let fixture: ComponentFixture<MemNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemNavbarComponent]
    });
    fixture = TestBed.createComponent(MemNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
