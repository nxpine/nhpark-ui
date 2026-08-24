import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parks } from './parks';

describe('Parks', () => {
  let component: Parks;
  let fixture: ComponentFixture<Parks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Parks],
    }).compileComponents();

    fixture = TestBed.createComponent(Parks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
