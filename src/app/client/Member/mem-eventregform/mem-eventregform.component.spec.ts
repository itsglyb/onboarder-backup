import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemEventregformComponent } from './mem-eventregform.component';

describe('MemEventregformComponent', () => {
  let component: MemEventregformComponent;
  let fixture: ComponentFixture<MemEventregformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemEventregformComponent]
    });
    fixture = TestBed.createComponent(MemEventregformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
