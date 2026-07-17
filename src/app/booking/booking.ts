import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Booking, BookingService } from '../booking-service';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  newBooking: Booking = {} as Booking;
  updatedBooking: Booking = {} as Booking;
  createBookingFormVisible = false;
  updateBookingFormVisible = false;
  vehicleId: number | null = null;
  loading = false;
  errorMessage = '';
  vehicleOptions = ['VAN', 'SEDAN', 'SUV', 'Truck'];

  constructor(
    private readonly bookingService: BookingService,
    private readonly cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }


  loadBookings(): void {
    this.loading = true;
    this.errorMessage = '';
    this.createBookingFormVisible = false;
    this.updateBookingFormVisible = false;
    this.selectedBooking = null;

    this.bookingService
      .getBookings()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('BOOKING FINALIZE', this.loading);
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
          this.errorMessage = 'Unable to load booking from /api/booking.';
        },
      });
  }


  loadBookingById(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedBooking = null;

    this.bookingService
      .getBookingById(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (booking: Booking) => {
          this.selectedBooking = booking;
          this.updatedBooking = {... booking}
        
          this.createBookingFormVisible = false;
          this.updateBookingFormVisible = false;
        },
        error: () => {
          this.errorMessage = `Unable to load booking with ID ${id}.`;
        },
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

  updateBooking(id: number, updatedBooking: Booking): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookingService
      .updateBooking(id, updatedBooking)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
              next: (data) => {
                this.bookings = this.bookings.map((booking) =>
                  booking.id === id ? { ...booking, ...data, id } : booking,
                );
      
                this.selectedBooking = { ...(data ?? {}), id } as Booking;
                this.updateBookingFormVisible = false;
                this.createBookingFormVisible = false;
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

          this.bookings = this.bookings.filter(a => a.id !== id);

          if (this.selectedBooking?.id === id) {
            this.selectedBooking = null;
          }
        },
        error: () => {
          this.errorMessage = 'Unable to delete booking.';
        }
      });
  }
  showUpdateBookingForm(booking: Booking): void {
  this.updatedBooking = {...booking};
  this.updateBookingFormVisible = true;
  this.createBookingFormVisible = false;
  this.selectedBooking = null;
  this.errorMessage = '';
}

  hideUpdateBookingForm(): void {
    this.updateBookingFormVisible = false;
    this.selectedBooking = null;
    this.loadBookings();
  }

  showCreateBookingForm(): void {
    this.createBookingFormVisible = true;
    this.updateBookingFormVisible = false;
    this.selectedBooking = null;
    this.errorMessage = '';
  }

  hideCreateBookingForm(): void {
    this.createBookingFormVisible = false;
    this.newBooking = {} as Booking;
    this.loadBookings();
  }

  clearSelection(): void {
    this.selectedBooking = null;
  }
}