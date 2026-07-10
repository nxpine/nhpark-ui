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
  booking: Booking = {} as Booking;
  vehicleId: number | null = null;

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

        this.bookingId = Number(idParam);

        this.loadBookingById(this.bookingId);

      }

    });

  }


  loadBookingById(id: number): void {

    if (!id) {

      this.errorMessage = 'Invalid booking ID.';
      return;

    }


    this.loading = true;
    this.errorMessage = '';


    this.bookingService
      .getBookingById(id)
      .pipe(
        take(1),
        finalize(() => {

          this.loading = false;
          this.cdr.markForCheck();

        })
      )
      .subscribe({

        next: (booking: Booking) => {

          this.booking = booking;

        },

        error: (err) => {

          console.error(err);

          this.errorMessage = `Unable to load booking with ID ${id}.`;

        }

      });

  }



  updateBooking(): void {

    if (!this.bookingId) {

      this.errorMessage = 'Invalid booking ID.';
      return;

    }


    this.loading = true;
    this.errorMessage = '';


    this.bookingService
      .updateBooking(this.bookingId, this.booking)
      .pipe(
        take(1),
        finalize(() => {

          this.loading = false;
          this.cdr.markForCheck();

        })
      )
      .subscribe({

        next: (updatedBooking: Booking) => {

          this.booking = updatedBooking;

          this.errorMessage = 'Booking updated successfully.';

        },

        error: (err) => {

          console.error(err);

          this.errorMessage = 'Unable to update booking.';

        }

      });

  }

}
    