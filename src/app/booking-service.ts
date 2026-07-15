import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  bookingId?: number;
  startDateTime?: string;
  endDateTime?: string;
  serviceType?: string;
  vehicleId?: number;
  status?: string;
  createdAt?: string;
  customerId?: number;
}

@Injectable({
  providedIn: 'root',
})

export class BookingService {

  private readonly apiUrl = '/api/booking';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getBookingByCustomerId(customerId: number): Observable<Booking> {
  return this.http.get<Booking>(`${this.apiUrl}/customer/${customerId}`);
}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  updateBooking(id: number, updatedBooking: Booking): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}`, updatedBooking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}