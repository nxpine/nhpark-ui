import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookingService } from './booking-service';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the provided booking payload when updating a booking', () => {
    const booking = {
      bookingId: 7,
      bookingDate: '2026-07-01',
      customerId: 3,
      locationId: 2,
    };

    service.updateBooking(7, booking).subscribe();

    const req = httpMock.expectOne('/api/booking/7');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(booking);
    req.flush(booking);
  });
});
