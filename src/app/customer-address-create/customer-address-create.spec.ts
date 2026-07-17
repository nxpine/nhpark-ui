import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressCreateComponent } from './customer-address-create';

describe('CustomerAddressCreate', () => {
  let component: CustomerAddressCreateComponent;
  let fixture: ComponentFixture<CustomerAddressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddressCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddressCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
