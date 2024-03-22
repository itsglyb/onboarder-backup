import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemProfileComponent } from './mem-profile.component';

describe('MemProfileComponent', () => {
  let component: MemProfileComponent;
  let fixture: ComponentFixture<MemProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemProfileComponent]
    });
    fixture = TestBed.createComponent(MemProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
