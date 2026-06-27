import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCurrentInjector } from '@angular/core/primitives/di';

export interface Location {
  locationId?: number;
  locationDescription?: string;
  addressId?: number;
  customerId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly apiUrl = '/api/location';

  constructor(private readonly http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  updateLocation(id: number, updatedLocation: Location): Observable<Location> {
    return this.http.patch<Location>(`${this.apiUrl}/${id}`, updatedLocation);
  }
  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}