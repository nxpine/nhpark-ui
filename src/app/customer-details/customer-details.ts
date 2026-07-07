import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer-service';
import { Address, AddressService } from '../address-service';
import { Booking, BookingService } from '../booking-service';
import { finalize, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss',
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number | null = null;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  selectedAddress: Address | null = null;
  addresses: Address[] = [];
  addressId: number | null = null;
  bookings: Booking[] = [];
  bookingId: number | null = null;
  selectedBooking: Booking | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly bookingService: BookingService,
    private readonly cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.customerId = +idParam; // Convert to number
        this.loadCustomerById(this.customerId);
        this.loadAddressByCustomerId(this.customerId); // Assuming addressId is the same as customerId for this example
        this.loadBookingByCustomerId(this.customerId);
      }
    });
  }
  
  loadCustomerById(id: number | null): void {
    if (!id) {
      console.error('Invalid customer ID');
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.selectedCustomer = null; // Clear previous selection
    this.selectedAddress = null; // Clear previous address selection
    this.selectedBooking = null;

    this.customerService
      .getCustomerById(id) // Assumes this method exists in CustomerService
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('CUSTOMER BY ID FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (customer: Customer) => {
          console.log('CUSTOMER BY ID DATA', customer);
          this.selectedCustomer = customer;
        },
        error: (err) => {
          console.error('CUSTOMER BY ID ERROR', err);
          this.errorMessage = `Unable to load customer with ID ${id}.`;
        },
      });
  }
  loadAddressByCustomerId(customerId: number | null): void {
    if (!customerId) {
      console.error('Invalid address ID');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.selectedAddress = null;

    this.addressService
      .getAddressByCustomerId(customerId)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (data) => {
          const payload = Array.isArray(data)
            ? data
            : ((data as { items?: Address[]; data?: Address[] })?.items ??
              (data as { items?: Address[]; data?: Address[] })?.data ??
              []);

          this.addresses = Array.isArray(payload) ? payload : [];
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Unable to load addresses from /api/address.';
        }
      });
  }
  loadBookingByCustomerId(customerId: number | null): void {
  if (!customerId) {
    console.error('Invalid booking ID');
    return;
  }

  this.loading = true;
  this.errorMessage = '';
  this.selectedBooking = null;

  this.bookingService
    .getBookingByCustomerId(customerId)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    )
    .subscribe({
      next: (data) => {
        const payload = Array.isArray(data)
          ? data
          : ((data as { items?: Booking[]; data?: Booking[] })?.items ??
             (data as { items?: Booking[]; data?: Booking[] })?.data ??
             []);

        this.bookings = Array.isArray(payload) ? payload : [];
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Unable to load bookings from /api/booking.';
      }
    });
  }
}