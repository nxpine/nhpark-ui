import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBookingCreateComponent } from './customer-booking-create';

describe('CustomerBookingCreate', () => {
  let component: CustomerBookingCreateComponent;
  let fixture: ComponentFixture<CustomerBookingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerBookingCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerBookingCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
