import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleCreateComponent } from './customer-vehicle-create';

describe('CustomerVehicleCreate', () => {
  let component: CustomerVehicleCreateComponent;
  let fixture: ComponentFixture<CustomerVehicleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerVehicleCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerVehicleCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
