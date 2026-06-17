
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

    
export interface Address {
  id?: number;
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  customerId?: number;
}


@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl = '/api/address';

  constructor(private readonly http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }
}
