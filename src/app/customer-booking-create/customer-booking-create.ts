import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingService } from '../booking-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-booking-create',
  standalone: false,
  templateUrl: './customer-booking-create.html',
  styleUrl: './customer-booking-create.scss',
})
export class CustomerBookingCreateComponent implements OnInit {
  customerId: number | null = null;

  booking: Booking = {} as Booking;

  loading = false;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.customerId = Number(id);
        this.booking.customerId = this.customerId;
      }
    });
  }

  createBooking(): void {
    if (!this.customerId) {
      this.errorMessage = 'Customer ID is missing.';
      return;
    }

    this.booking.customerId = this.customerId;

    this.loading = true;
    this.errorMessage = '';

    this.bookingService
      .createBooking(this.booking)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/customer-details', this.customerId]);
        },

        error: (err) => {
          console.error(err);

          this.loading = false;
          this.errorMessage = 'Unable to create booking.';
        },
      });
  }

  goBack(): void {
    if (this.customerId) {
      this.router.navigate(['/customer-details', this.customerId]);
    }
  }

}