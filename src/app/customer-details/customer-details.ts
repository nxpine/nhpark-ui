import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer-service';
import { Address, AddressService } from '../address-service';
import { Booking, BookingService } from '../booking-service';
import { finalize, Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss',
  imports: [MatTabsModule, MatButtonModule],
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number | null = null;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  selectedAddress: Address | null = null;
  addresses: Address[] = [];
  addressId: number | null = null;
  updatedAddress: Address = {} as Address;
  bookings: Booking[] = [];
  bookingId: number | null = null;
  selectedBooking: Booking | null = null;
  updatedCustomer: Customer = {} as Customer;
  updateCustomerFormVisible: boolean = false;
  updateCustomerDetailsFormVisible: boolean = false;
  createBookingFormVisible: boolean = false;
  newBooking: Booking = {} as Booking;
  updatedBooking: Booking = {} as Booking;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly bookingService: BookingService,
    private readonly cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private readonly router: Router,
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
updateAddress(id: number | undefined): void {

  if (!id) {
    console.error('Invalid address ID');
    return;
  }

  this.router.navigate(['/customer-address', id]);

}

deleteAddress(id: number): void {

  this.loading = true;
  this.errorMessage = '';

  this.addressService
    .deleteAddress(id)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    )
    .subscribe({
      next: () => {

        this.addresses = this.addresses.filter(
          (address) => address.id !== id
        );

        if (this.selectedAddress?.id === id) {
          this.selectedAddress = null;
        }

      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Unable to delete address.';
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

createBooking(newBooking: Booking): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookingService
      .createBooking(newBooking)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
              next: (createdBooking: Booking) => {
      
                this.bookings.push(createdBooking);
      
                this.newBooking = {} as Booking;
      
                this.createBookingFormVisible = false;
              },
              error: () => {
                this.errorMessage = 'Unable to create booking.';
              }
            });
        }

  updateBooking(id: number): void {

  this.loading = true;
  this.errorMessage = '';

  this.bookingService
    .updateBooking(id, this.updatedBooking)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    )
    .subscribe({
      next: () => {

        this.bookings = this.bookings.filter(
          (booking) => booking.id !== id
        );

        if (this.selectedBooking?.id === id) {
          this.selectedBooking = null;
        }

      },
      error: () => {
        this.errorMessage = 'Unable to update booking.';
      }
    });
}

deleteBooking(id: number): void {

  this.loading = true;
  this.errorMessage = '';

  this.bookingService
    .deleteBooking(id)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    )
    .subscribe({
      next: () => {

        this.bookings = this.bookings.filter(
          (booking) => booking.id !== id
        );

        if (this.selectedBooking?.id === id) {
          this.selectedBooking = null;
        }

      },
      error: () => {
        this.errorMessage = 'Unable to delete booking.';
      }
    });
}
}