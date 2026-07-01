import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Booking, BookingService } from '../booking-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  newBooking: Booking = { vehicleType: 'Car' } as Booking;
  updatedBooking: Booking = { vehicleType: 'Car' } as Booking;
  createBookingFormVisible = false;
  updateBookingFormVisible = false;
  loading = false;
  errorMessage = '';
  vehicleOptions = ['Compact', 'Sedan', 'SUV', 'Truck'];

  constructor(
    private readonly bookingService: BookingService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  getBookingId(booking: Booking | null | undefined): number | undefined {
    return booking?.id ?? booking?.bookingId;
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
      
                console.log('BOOKING DATA', data, 'NORMALIZED', payload);
          this.bookings = Array.isArray(payload) ? payload : [];
          this.loading = false;
          console.log('BOOKING STATE', this.loading, this.bookings);
        },
        error: (err) => {
          console.error('BOOKING ERROR', err);
          this.errorMessage = 'Unable to load booking from /api/booking.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          console.log('BOOKING COMPLETE', this.loading, this.bookings);
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
          this.bookings = this.bookings.map((booking) => {
            const bookingId = this.getBookingId(booking);
            return bookingId === id ? { ...booking, ...data, id: data.id ?? booking.id ?? id, bookingId: data.bookingId ?? booking.bookingId ?? id } : booking;
          });

          this.selectedBooking = { ...(data ?? {}), id: data.id ?? id, bookingId: data.bookingId ?? id } as Booking;
          this.updateBookingFormVisible = false;
          this.createBookingFormVisible = false;
        },
        error: () => {
          this.errorMessage = 'Unable to update booking.';
        }
      });
  }

  deleteBooking(id: number): void {
    this.loading = false;
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
           this.bookings = this.bookings.filter((booking) => this.getBookingId(booking) !== id);

          if (this.getBookingId(this.selectedBooking) === id) {
            this.selectedBooking = null;
          }
        },
        error: () => {
          this.errorMessage = 'Unable to delete booking.';
        }
      });
  }
  showUpdateBookingForm(booking: Booking): void {
    this.updatedBooking = { ...booking, vehicleType: booking.vehicleType ?? 'Car' };
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
    this.newBooking = { vehicleType: 'Car' } as Booking;
    this.createBookingFormVisible = true;
    this.updateBookingFormVisible = false;
    this.selectedBooking = null;
    this.errorMessage = '';
  }

  hideCreateBookingForm(): void {
    this.createBookingFormVisible = false;
    this.newBooking = { vehicleType: 'Car' } as Booking;
    this.loadBookings();
  }

  clearSelection(): void {
    this.selectedBooking = null;
  }
}