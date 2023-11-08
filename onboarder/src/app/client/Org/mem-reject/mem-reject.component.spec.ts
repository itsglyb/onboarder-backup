import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemRejectComponent } from './mem-reject.component';

describe('MemRejectComponent', () => {
  let component: MemRejectComponent;
  let fixture: ComponentFixture<MemRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemRejectComponent]
    });
    fixture = TestBed.createComponent(MemRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
