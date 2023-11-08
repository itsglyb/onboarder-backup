import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemOrgmemformComponent } from './mem-orgmemform.component';

describe('MemOrgmemformComponent', () => {
  let component: MemOrgmemformComponent;
  let fixture: ComponentFixture<MemOrgmemformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemOrgmemformComponent]
    });
    fixture = TestBed.createComponent(MemOrgmemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
