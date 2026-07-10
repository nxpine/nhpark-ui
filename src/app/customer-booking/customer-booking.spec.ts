import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerBookingComponent } from './customer-booking';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerBooking', () => {
  let component: CustomerBookingComponent;
  let fixture: ComponentFixture<CustomerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerBookingComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerBookingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
