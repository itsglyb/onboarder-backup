import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemLandingComponent } from './mem-landing.component';

describe('MemLandingComponent', () => {
  let component: MemLandingComponent;
  let fixture: ComponentFixture<MemLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemLandingComponent]
    });
    fixture = TestBed.createComponent(MemLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
