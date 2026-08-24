import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksComponent } from './parks';

describe('ParksComponent', () => {
  let component: ParksComponent;
  let fixture: ComponentFixture<ParksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParksComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
