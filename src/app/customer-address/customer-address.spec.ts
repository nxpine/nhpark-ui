import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddress } from './customer-address';

describe('CustomerAddress', () => {
  let component: CustomerAddress;
  let fixture: ComponentFixture<CustomerAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
