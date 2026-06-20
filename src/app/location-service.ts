import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
}