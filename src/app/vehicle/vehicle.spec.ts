import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vehicle } from './vehicle';

describe('Vehicle', () => {
  let component: Vehicle;
  let fixture: ComponentFixture<Vehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vehicle],
    }).compileComponents();

    fixture = TestBed.createComponent(Vehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide common vehicle types', () => {
    expect(component.vehicleTypes).toContain('Car');
    expect(component.vehicleTypes.length).toBeGreaterThan(0);
  });
});
