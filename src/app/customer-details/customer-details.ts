import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer-service';
import { Address, AddressService } from '../address-service';
import { Booking, BookingService } from '../booking-service';
import { finalize, take } from 'rxjs';
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
  createAddressFormVisible: boolean = false;
  createBookingFormVisible: boolean = false;
  updateAddressFormVisible: boolean = false;
  newBooking: Booking = {} as Booking;
  newAddress: Address = {} as Address;
  updatedBooking: Booking = {} as Booking;
  vehicleId: number | null = null;
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

    if (idParam) {
      this.customerId = Number(idParam);

      this.loadCustomerById(this.customerId);
      this.loadAddressByCustomerId(this.customerId);
      this.loadBookingByCustomerId(this.customerId);

    } else {
      console.error('No customer ID found in route');
      this.errorMessage = 'Customer ID missing.';
    }

  });
}


loadCustomerById(id: number): void {

  this.loading = true;
  this.errorMessage = '';

  this.customerService
    .getCustomerById(id)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({

      next: (customer: Customer) => {
        console.log('Customer loaded:', customer);

        this.selectedCustomer = customer;

      },

      error: (err) => {
        console.error('Customer loading error:', err);

        this.errorMessage = 
          `Unable to load customer with ID ${id}.`;

        this.selectedCustomer = null;
      }

    });

}
  loadAddressByCustomerId(customerId: number | null): void {
    if (!customerId) {
      console.error('Invalid customer ID');
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
createAddress(): void {

  if (!this.customerId) {
    console.error('Invalid customer ID');
    return;
  }

  this.router.navigate(['/create-address', this.customerId]);

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

  if (customerId === null || customerId === undefined) {
    console.error('Invalid customer ID');
    return;
  }

  this.loading = true;
  this.errorMessage = '';

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

        this.bookings = payload;

        console.log('Bookings for customer:', customerId, this.bookings);
      },

      error: (err) => {
        console.error('Booking loading error:', err);
        this.errorMessage = `Unable to load bookings for customer ${customerId}.`;
      }
    });
}

updateBooking(id: number | undefined): void {

  if (!id) {
    console.error('Invalid booking ID');
    return;
  }

  this.router.navigate(['/customer-booking', id]);

}


createBooking(): void {

  if (!this.customerId) {
    console.error('Invalid customer ID');
    return;
  }

  this.router.navigate(['/customer-booking', this.customerId]);

}

deleteBooking(id: number | undefined): void {

  if (id === undefined) {
    console.error('Invalid booking ID');
    return;
  }

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
      error: (err) => {
  console.error(err);
  this.errorMessage = 'Unable to delete booking.';
}
    });
}
}
