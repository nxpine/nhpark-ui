import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressCreate } from './customer-address-create';

describe('CustomerAddressCreate', () => {
  let component: CustomerAddressCreate;
  let fixture: ComponentFixture<CustomerAddressCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddressCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddressCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
