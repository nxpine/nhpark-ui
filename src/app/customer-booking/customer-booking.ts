import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingService } from '../booking-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-customer-booking',
  standalone: false,
  templateUrl: './customer-booking.html',
  styleUrl: './customer-booking.scss',
})
export class CustomerBookingComponent implements OnInit {
  loading = false;
  errorMessage = '';
  bookingId: number | null = null;
  customerId: number | null = null;
  booking: Booking = {} as Booking;
  newBooking: Booking = {} as Booking;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookingService: BookingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam !== null) {
        this.bookingId = +idParam;

        this.loadBookingByCustomerId(this.bookingId);
      }
    });
  }

  loadBookingByCustomerId(id: number | null): void {
    if (!id) {
      console.error('Invalid customer ID.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.bookingService
      .getBookingByCustomerId(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (booking: Booking) => {
          this.booking = booking;
        },

        error: (err) => {
          console.error(err);
          this.errorMessage = `Customer Booking - Unable to load booking with ID ${id}.`;
        },
      });
  }

  updateBooking(): void {
    if (!this.bookingId) {
      console.error('Invalid booking ID.');
      return;
    }

    this.bookingService
      .updateBooking(this.bookingId, this.booking)
      .pipe(take(1))
      .subscribe({
        next: (booking: Booking) => {
          this.booking = booking;
          this.errorMessage = 'Booking saved successfully.';
          this.cdr.markForCheck();
        },

        error: (err) => {
          this.errorMessage = 'Unable to update booking.';
        },
      });
  }
  createBooking(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.bookingId) {
      this.newBooking.customerId = this.bookingId;
    }

    this.bookingService
      .createBooking(this.newBooking)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (booking: Booking) => {
          this.newBooking = {} as Booking;

          this.errorMessage = 'Booking created successfully.';
        },

        error: (err) => {
          console.error(err);

          this.errorMessage = 'Unable to create booking.';
        },
      });
  }
}
